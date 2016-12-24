import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';

import firebase, {firebaseRef} from 'app/firebase/';
import * as actions from 'actions';

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
    it('should generate search action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'some text'
        };
        var res = actions.setSearchText(action.searchText);
        expect(res).toEqual(action);
    });

    it('should generate add action', () => {
        var action = {
            type: 'ADD_TODO',
            todo: {
                id: '111',
                text: 'some text1',
                completed: false,
                completedAt: null,
                createdAt: 4333
            }
        };
        var res = actions.addTodo(action.todo);
        expect(res).toEqual(action);
    });

    it('should generate showcompleted action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETE'
        };
        var res = actions.toggleShowCompleted();
        expect(res).toEqual(action);
    });

    it('should generate update todo action', () => {
        var action = {
            type: 'UPDATE_TODO',
            id: 5,
            updates: {completed: false}
        };
        var res = actions.updateTodo(action.id, action.updates);
        expect(res).toEqual(action);
    });

    it('should generate add todos action', () => {
        var todos = [{
            id: '111',
            text: 'some text1',
            completed: false,
            completedAt: undefined,
            createdAt: 4333
        }];
        var action = {
            type: 'ADD_TODOS',
            todos
        };
        var res = actions.addTodos(todos);
        expect(res).toEqual(action);
    });

    it('should generate login action', () => {
        const action = {
            type: 'LOGIN',
            uid: 'assafd234'
        };
        const res = actions.login(action.uid);

        expect(res).toEqual(action);
    });

    it('should generate logout action', () => {
        const action = {
            type: 'LOGOUT'
        };
        const res = actions.logout();

        expect(res).toEqual(action);
    });

    describe('Tests firebase', () => {
        var testTodoRef;
        var mockTodo = {
            text: 'some text firebase',
            completed: false,
            createdAt: 23444
        };
        var uid;
        var todosRef;

        beforeEach((done) => {
            var credential = firebase.auth.GithubAuthProvider.credential(process.env.GITHUB_TOKEN);
            uid = '2ErpuZHozYWbpwLac9MNzZWI6pE2';
            todosRef = firebaseRef.child(`users/${uid}/todos`);
            // firebase.auth().signInWithCredential(credential).then((user) => {
            //     uid = user.uid;
            //     todosRef = firebaseRef.child(`users/${uid}/todos`);
            //     return todosRef.remove();
            // })
            todosRef.remove().then(() => {
                    testTodoRef = todosRef.push();

                    return testTodoRef.set(mockTodo);
                })
                .then(() => done())
                .catch(done);
        });

        afterEach((done) => {
            todosRef.remove().then(() => done()).catch(done);
        });

        it('should toggle todo and dispatch update todo action', (done) => {
            var store = createMockStore({auth: {uid}});
            var action = actions.startToggleTodo(testTodoRef.key, true);

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({
                    type: 'UPDATE_TODO',
                    id: testTodoRef.key
                });
                expect(mockActions[0].updates).toInclude({
                    completed: true
                });
                expect(mockActions[0].updates.completedAt).toExist();
                done();
            }, done);
        });

        it('should add existing items with add todos', (done) => {
            var store = createMockStore({auth: {uid}});
            var action = actions.startAddTodos();

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0].type).toEqual('ADD_TODOS');
                expect(mockActions[0].todos.length).toBe(1);
                expect(mockActions[0].todos[0].text).toEqual(mockTodo.text);

                done();
            }, done);
        });

        it('should startAddTodo (async) create todo and dispatch add todo', (done) => {
            var store = createMockStore({auth: {uid}});
            const text = 'some text';

            store.dispatch(actions.startAddTodo(text)).then(() => {
                const actions = store.getActions();
                expect(actions[0]).toInclude({
                    type: 'ADD_TODO'
                });
                expect(actions[0].todo).toInclude({
                    text: text
                });
                done();
            }).catch(done);
        });
    });
});