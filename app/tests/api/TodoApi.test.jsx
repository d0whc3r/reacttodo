var expect = require('expect');

var TodoApi = require('TodoApi');

describe('TodoApi', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should exist', () => {
        expect(TodoApi).toExist();
    });

    describe('setTodos', () => {
        it('should setTodos valid', () => {
            var todos = [{
                id: 12,
                text: 'todo api',
                completed: false
            }];
            TodoApi.setTodos(todos);

            var actual = JSON.parse(localStorage.getItem('todos'));
            expect(actual).toEqual(todos);
        });

        it('should setTodos not valid array', () => {
            var todos = {some: 'data', id: 2};
            TodoApi.setTodos(todos);

            expect(localStorage.getItem('todos')).toBe(null);
        });

        it('should setTodos empty array', () => {
            var todos = null;
            TodoApi.setTodos(todos);

            expect(localStorage.getItem('todos')).toBe(null);
        });
    });


    describe('getTodos', () => {
        it('should getTodos empty array', () => {
            var actual = TodoApi.getTodos();
            expect(actual).toEqual([]);
        });

        it('should getTodos with valid array', () => {
            var todos = [{
                id: 12,
                text: 'todo api',
                completed: false
            }];
            localStorage.setItem('todos', JSON.stringify(todos));
            var actual = TodoApi.getTodos();
            expect(actual).toEqual(todos);
        });
    });

    describe('filterTodos', () => {
        var todos = [{
            id: 12,
            text: 'todo api1',
            completed: true
        }, {
            id: 13,
            text: 'todox api2',
            completed: false
        }, {
            id: 14,
            text: 'todox api3',
            completed: true
        }];

        it('should return all item is showcompleted = true', () => {
            var filtered = TodoApi.filterTodos(todos, true, '');
            expect(filtered.length).toBe(3);
        });

        it('should return 1 item is showcompleted = false', () => {
            var filtered = TodoApi.filterTodos(todos, false, '');
            expect(filtered.length).toBe(1);
        });

        it('should be first not completed', () => {
            var filtered = TodoApi.filterTodos(todos, true, '');
            expect(filtered.length).toBe(3);
            expect(filtered[0].id).toBe(todos[1].id);
            expect(filtered[0].completed).toBe(false);
        });

        it('should search for the text', () => {
            var filtered = TodoApi.filterTodos(todos, true, 'TODOX');
            expect(filtered.length).toBe(2);
        });

        it('should search for null text', () => {
            var filtered = TodoApi.filterTodos(todos, true, '');
            expect(filtered.length).toBe(3);
        });

        it('should search for non found text', () => {
            var filtered = TodoApi.filterTodos(todos, true, 'asdf');
            expect(filtered.length).toBe(0);
        });
    });
});