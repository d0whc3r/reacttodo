var React = require('react');
var TodoList = require('TodoList');
var TodoForm = require('TodoForm');
var TodoSearch = require('TodoSearch');

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            showCompleted: false,
            searchText: '',
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
    handleSearch: function (show, search) {
        this.setState({
            showCompleted: show,
            searchText: search.toLowerCase()
        });
    },
    render: function () {
        var {todos} = this.state;
        return (
            <div>
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={todos}/>
                <TodoForm onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;