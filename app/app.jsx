import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';
import {IntlProvider, IntlActions} from 'react-redux-multilingual'

import * as actions from 'actions';
import {configure} from 'configureStore';
import firebase from 'app/firebase/';
import router from 'app/router/';
import {translations} from 'app/i18n/translations';

var store = configure();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(actions.login(user.uid));
        store.dispatch(actions.startAddTodos());
        hashHistory.push('/todos');
    } else {
        store.dispatch(actions.logout());
        hashHistory.push('/');
    }
});

// Load fundation
$(document).foundation();

// App scss
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider translations={translations}>
            {router}
        </IntlProvider>
    </Provider>,
    document.getElementById('app')
);

store.dispatch(IntlActions.setLocale('es'));
