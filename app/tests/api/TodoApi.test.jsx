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

        it('should getTodos with valid array',()=>{
            var todos = [{
                id: 12,
                text: 'todo api',
                completed: false
            }];
            localStorage.setItem('todos',JSON.stringify(todos));
            var actual = TodoApi.getTodos();
            expect(actual).toEqual(todos);
        });
    });
});