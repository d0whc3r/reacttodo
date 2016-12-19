var React = require('react');
var TodoList = require('TodoList');
var TodoForm= require('TodoForm');

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
    handleAddTodo: function (text) {
        alert('new ' + text);
    },
    render: function () {
        var {todos} = this.state;
        return (
            <div>
                <TodoList todos={todos}/>
                <TodoForm onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;