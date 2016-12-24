import expect from 'expect';
import df from 'deep-freeze-strict';

import * as reducers from 'reducers';

describe('Reducers', () => {
    describe('SearchText', () => {
        it('should return search text', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'adadas'
            };
            var res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        });
    });
    describe('showCompleted', () => {
        it('should return toggled status', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETE',
            };
            var state = true;
            var res = reducers.showCompletedReducer(df(state), df(action));

            expect(res).toBe(!state);
        });
    });
    describe('todosReducer', () => {
        it('should return new todo', () => {
            var action = {
                type: 'ADD_TODO',
                todo: {
                    id: 'asdf123',
                    text: 'some todo',
                    completed: false,
                    createdAt: 234,
                    completed: null
                }
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toBe(1);
            expect(res[0]).toEqual(action.todo);
        });
        it('should update todo', () => {
            var todos = [{
                id: '123',
                text: 'some',
                completed: true,
                createdAt: 1,
                completedAt: 122
            }];
            var updates = {
                completed: false,
                completedAt: null
            };
            var action = {
                type: 'UPDATE_TODO',
                id: todos[0].id,
                updates
            };

            var res = reducers.todosReducer(df(todos), df(action));

            expect(res.length).toBe(1);
            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toEqual(updates.completedAt);
            expect(res[0].text).toEqual(todos[0].text);
        });

        it('should add existing todos', () => {
            var todos = [{
                id: '111',
                text: 'some text1',
                completed: false,
                completedAd: undefined,
                createdAt: 4333
            }];
            var action = {
                type: 'ADD_TODOS',
                todos
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toBe(1);
            expect(res[0]).toEqual(todos[0]);
        });

        it('should wipe todos on logout', () => {
            var todos = [{
                id: '111',
                text: 'some text1',
                completed: false,
                completedAd: undefined,
                createdAt: 4333
            }];
            var action = {
                type: 'LOGOUT'
            };
            var res = reducers.todosReducer(df(todos), df(action));

            expect(res.length).toBe(0);
        });
    });

    describe('authReducer', () => {
        it('should store uid on login', ()=> {
            const action = {
                type: 'LOGIN',
                uid: 'asdf2134'
            };
            const res = reducers.authReducer(undefined, df(action));

            expect(res).toEqual({
                uid: action.uid
            });
        });

        it('should remove auth on logout',()=> {
            const auth = {
                uid: '2134asdf'
            };
            const action = {
                type: 'LOGOUT'
            };

            const res = reducers.authReducer(df(auth), df(action));

            expect(res).toEqual({});
        });
    });
});