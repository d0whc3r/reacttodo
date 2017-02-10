import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Login from 'Login';
import TodoApp from 'TodoApp';


export default (
    <Router history={hashHistory}>
        <Route path="/">
            <Route path="todos" component={TodoApp}/>
            <IndexRoute component={Login}/>
        </Route>
    </Router>
);
