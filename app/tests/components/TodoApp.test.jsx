var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe('TodoApp', () => {
    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    it('should add todo to list', () => {
        var text = 'some text';
        todoApp.setState({
            todos: []
        });
        todoApp.handleAddTodo(text);
        expect(todoApp.state.todos).toExist();
        expect(todoApp.state.todos.length).toBe(1);
        expect(todoApp.state.todos[0].text).toBe(text);
    });

    it('should toggle completed on handleToggle', () => {
        // var todoApp=TestUtils.renderIntoDocument(<TodoApp/>)
        var data = {
            id: 11,
            text: 'some text',
            completed: false
        };
        todoApp.setState({todos: [data]});
        expect(todoApp.state.todos[0].completed).toBe(false);
        todoApp.handleToggle(11);
        expect(todoApp.state.todos[0].completed).toBe(true);
    });
});