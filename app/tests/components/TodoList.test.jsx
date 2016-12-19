var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    describe('Todo Handler', () => {
        it('should render one Todo component for each item', () => {
            var todos=[{
                id: 1,
                text: 'something'
            },{
                id: 2,
                text: 'something2'
            }];
            var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
            var todosComps = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

            expect(todosComps.length).toBe(todos.length);
        });
    });
});