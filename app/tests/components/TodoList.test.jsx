import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import expect from 'expect';
import $ from 'jquery';
import TestUtils from 'react-addons-test-utils';

import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    describe('Todo Handler', () => {
        it('should render one Todo component for each item', () => {
            var todos = [{
                id: 1,
                text: 'something',
                completed: false,
                completedAt: undefined,
                createdAt: 123
            }, {
                id: 2,
                text: 'something2',
                completed: false,
                completedAt: undefined,
                createdAt: 123
            }];
            var store = configure({
                todos
            });
            var provider = TestUtils.renderIntoDocument(
                <Provider store={store}>
                    <ConnectedTodoList/>
                </Provider>
            );
            var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
            var todosComps = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

            expect(todosComps.length).toBe(todos.length);
        });

        it('should render a message if no todos', () => {
            var todos = [];
            var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
            var $el = $(ReactDOM.findDOMNode(todoList));
            expect($el.find('.container__message').length).toBe(1);
        });
    });
});