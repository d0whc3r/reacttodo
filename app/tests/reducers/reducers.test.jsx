var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
    describe('SearchText', () => {
        it('should return search text', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'adadas'
            };
            var res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        });
    });
    describe('showCompleted', () => {
        it('should return toggled status', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETE',
            };
            var state = true;
            var res = reducers.showCompletedReducer(df(state), df(action));

            expect(res).toBe(!state);
        });
    });
});