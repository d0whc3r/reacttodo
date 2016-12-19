var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoSearch = require('TodoSearch');

describe('TodoSearch', () => {
    it('should exist', () => {
        expect(TodoSearch).toExist();
    });

    it('should call onSearch with input text', () => {
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
        var text = 'asdf';
        var show = todoSearch.refs.showcompleted.checked;
        todoSearch.refs.searchtext.value = text;
        TestUtils.Simulate.change(todoSearch.refs.searchtext);
        expect(spy).toHaveBeenCalledWith(show, text);
    });

    it('should call onSearch with checkbox', () => {
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
        var checkbox = true;
        var text = todoSearch.refs.searchtext.value;
        todoSearch.refs.showcompleted.checked = checkbox;
        TestUtils.Simulate.change(todoSearch.refs.showcompleted);
        expect(spy).toHaveBeenCalledWith(checkbox, text);
    });
});