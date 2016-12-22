import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';
var actions = require('actions');

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

    it('should startAddTodo (async) create todo and dispatch add todo', (done) => {
        var store = createMockStore({});
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

    describe('Tests firebase', () => {
        var testTodoRef;

        beforeEach((done) => {
            testTodoRef = firebaseRef.child('todos').push();

            testTodoRef.set({
                text: 'some text firebase',
                completed: false,
                createdAt: 23444
            }).then(() => done());
        });

        afterEach((done) => {
            testTodoRef.remove().then(() => done());
        });

        it('should toggle todo and dispatch update todo action', (done) => {
            var store = createMockStore({});
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
    });
});