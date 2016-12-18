var React = require('react');
var TodoList = require('TodoList');

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            todos: [{
                id: 1,
                text: 'some 1'
            }, {
                id: 2,
                text: 'clean some 2'
            }]
        };
    },
    render: function () {
        var {todos} = this.state;
        return (
            <div>
                <TodoList todos={todos}/>
            </div>
        );
    }
});

module.exports = TodoApp;