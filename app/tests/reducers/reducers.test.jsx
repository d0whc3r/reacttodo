var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

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
        it('should toggle todo', () => {
            var action = {
                type: 'TOGGLE_TODO',
                id: '123'
            };
            var todos = [{
                id: '123',
                text: 'some',
                completed: true,
                createdAt: 1,
                completedAt: 122
            }];
            var res = reducers.todosReducer(df(todos), df(action));

            expect(res.length).toBe(1);
            expect(res[0].completed).toEqual(!todos[0].completed);
            expect(res[0].completedAt).toNotExist();
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
    });
});