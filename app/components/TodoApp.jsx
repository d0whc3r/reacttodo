var React = require('react');
var uuid = require('node-uuid');

var TodoList = require('TodoList');
var TodoForm = require('TodoForm');
var TodoSearch = require('TodoSearch');
var TodoApi = require('TodoApi');

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            showCompleted: false,
            searchText: '',
            todos: [{
                id: uuid(),
                text: 'some 1',
                completed: false
            }, {
                id: uuid(),
                text: 'clean some 2',
                completed: true
            }]
        };
    },
    componentDidUpdate: function () {
        TodoApi.setTodos(this.state.todos);
    },
    componentWillMount: function () {
        this.setState({
            todos: TodoApi.getTodos()
        });
    },
    handleAddTodo: function (text) {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(),
                    text: text,
                    completed: false
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
    handleToggle: function (id) {
        var updated = this.state.todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        this.setState({
            todos: updated
        });
    },
    render: function () {
        var {todos} = this.state;
        return (
            <div>
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={todos} onToggle={this.handleToggle}/>
                <TodoForm onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;