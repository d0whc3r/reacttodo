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

    it('should add todo to list', () => {
        var text = 'some text';
        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({
            todos: []
        });
        todoApp.handleAddTodo(text);
        expect(todoApp.state.todos).toExist();
        expect(todoApp.state.todos.length).toBe(1);
        expect(todoApp.state.todos[0].text).toBe(text);
    })
});