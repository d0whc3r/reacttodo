var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

// var TodoSearch = require('TodoSearch');
import {TodoSearch} from 'TodoSearch';

describe('TodoSearch', () => {
    it('should exist', () => {
        expect(TodoSearch).toExist();
    });

    it('should dispatch serch text on input change', () => {
        var searchText = 'asdf';
        var action={
            type: 'SET_SEARCH_TEXT',
            searchText
        };
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);
        todoSearch.refs.searchtext.value = searchText;

        TestUtils.Simulate.change(todoSearch.refs.searchtext);
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should dispatch toggle showcompleted', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETE'
        };
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);
        var checkbox = true;
        todoSearch.refs.showcompleted.checked = checkbox;

        TestUtils.Simulate.change(todoSearch.refs.showcompleted);
        expect(spy).toHaveBeenCalledWith(action);
    });
});