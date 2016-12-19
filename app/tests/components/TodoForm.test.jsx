var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoForm = require('TodoForm');

describe('TodoForm', () => {
    it('should exist', () => {
        expect(TodoForm).toExist();
    });

    it('should call function onAddTodo', () => {
        var spy = expect.createSpy();
        var todoForm = TestUtils.renderIntoDocument(<TodoForm onAddTodo={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todoForm));
        var text = 'Check mail';
        todoForm.refs.todo.value = text;
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(spy).toHaveBeenCalledWith(text);
    });

    it('should NOT call function onAddTodo', () => {
        var spy = expect.createSpy();
        var todoForm = TestUtils.renderIntoDocument(<TodoForm onAddTodo={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todoForm));
        var text = '';
        todoForm.refs.todo.value = text;
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(spy).toNotHaveBeenCalled();
    });
});