var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var {TodoForm} = require('TodoForm');

describe('TodoForm', () => {
    it('should exist', () => {
        expect(TodoForm).toExist();
    });

    it('should dispatch add_todo with valid text', () => {
        var text = 'Check mail';
        var action = {
            type: 'ADD_TODO',
            text
        };
        var spy = expect.createSpy();
        var todoForm = TestUtils.renderIntoDocument(<TodoForm dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todoForm));
        todoForm.refs.todo.value = text;
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should NOT call action add_todo with invalid', () => {
        var text = '';
        var spy = expect.createSpy();
        var todoForm = TestUtils.renderIntoDocument(<TodoForm dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todoForm));
        todoForm.refs.todo.value = text;
        TestUtils.Simulate.submit($el.find('form')[0]);
        expect(spy).toNotHaveBeenCalled();
    });
});