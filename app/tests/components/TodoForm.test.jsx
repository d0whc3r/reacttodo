import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import * as actions from 'actions';
import {TodoForm} from 'TodoForm';

describe('TodoForm', () => {
    it('should exist', () => {
        expect(TodoForm).toExist();
    });

    it('should dispatch add_todo with valid text', () => {
        var text = 'Check mail';
        var action = actions.startAddTodo(text);
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