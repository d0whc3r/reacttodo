var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

import * as actions from 'actions';
import {Todo} from 'Todo';

describe('Todo', () => {
    it('should exist', () => {
        expect(Todo).toExist();
    });

    it('should dispatch TOGGLE_TODO with id', () => {
        var data = {
            id: 22,
            text: 'Todo.test.jsx toggle_todo',
            completed: true
        };
        var action = actions.startToggleTodo(data.id, !data.completed);

        var spy = expect.createSpy();
        var todo = TestUtils.renderIntoDocument(<Todo {...data} dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todo));
        TestUtils.Simulate.click($el[0]);
        expect(spy).toHaveBeenCalledWith(action);
    });
});