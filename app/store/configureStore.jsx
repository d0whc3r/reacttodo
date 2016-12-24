import * as redux from 'redux';
import thunk from 'redux-thunk';
import {IntlReducer as Intl} from 'react-redux-multilingual';

import * as reducers from 'reducers';

export var configure = (initialState = {}) => {
    var mapreducers = {};
    Object.keys(reducers).forEach((rname) => {
        var rvalue = rname.replace('Reducer', '');
        mapreducers[rvalue] = reducers[rname];
    });
    mapreducers = {
        ...mapreducers,
        Intl
    };
    var combineReducers = redux.combineReducers(mapreducers);

    return redux.createStore(combineReducers, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
};

export default configure;