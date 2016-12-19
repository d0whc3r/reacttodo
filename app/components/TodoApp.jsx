var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

var TodoList = require('TodoList');
var TodoForm = require('TodoForm');
var TodoSearch = require('TodoSearch');
var TodoApi = require('TodoApi');

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            showCompleted: false,
            searchText: '',
            todos: []
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
                    completed: false,
                    createdAt: moment().unix(),
                    completedAt: undefined
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
                todo.completedAt = todo.completed ? moment().unix() : undefined
            }
            return todo;
        });
        this.setState({
            todos: updated
        });
    },
    render: function () {
        var {todos, showCompleted, searchText} = this.state;
        var filtered = TodoApi.filterTodos(todos, showCompleted, searchText);
        return (
            <div>
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={filtered} onToggle={this.handleToggle}/>
                <TodoForm onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;