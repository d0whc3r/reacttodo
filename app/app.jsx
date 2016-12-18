var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');

$(document).foundation();

// App scss
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={TodoApp}>
            {/*<IndexRoute component={}/>*/}
        </Route>
    </Router>,

    document.getElementById('app')
);