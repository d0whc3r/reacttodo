var React = require('react');
var TodoList = require('TodoList');
var TodoForm = require('TodoForm');
var TodoSearch = require('TodoSearch');
var uuid = require('node-uuid');

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            showCompleted: false,
            searchText: '',
            todos: [{
                id: uuid(),
                text: 'some 1'
            }, {
                id: uuid(),
                text: 'clean some 2'
            }]
        };
    },
    handleAddTodo: function (text) {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(),
                    text: text
                }
            ]
        });
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