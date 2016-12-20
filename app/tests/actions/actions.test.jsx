var expect = require('expect');
var actions = require('actions');

describe('Actions', () => {
    it('should generate search action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'some text'
        };
        var res = actions.setSearchText(action.searchText);
        expect(res).toEqual(action);
    });
    it('should generate add action', () => {
        var action = {
            type: 'ADD_TODO',
            text: 'some text'
        };
        var res = actions.addTodo(action.text);
        expect(res).toEqual(action);
    });
    it('should generate showcompleted action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETE'
        };
        var res = actions.toggleShowCompleted();
        expect(res).toEqual(action);
    });
    it('should generate completed  action', () => {
        var action = {
            type: 'TOGGLE_TODO',
            id: 5
        };
        var res = actions.toggleTodo(action.id);
        expect(res).toEqual(action);
    });
});