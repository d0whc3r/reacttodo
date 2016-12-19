var React = require('react');

var TodoForm = React.createClass({
        propTypes: {
            onAddTodo: React.PropTypes.func.isRequired
        },
        addTodo: function (e) {
            e.preventDefault();
            var todo = this.refs.todo.value;
            if (todo && todo.length) {
                this.refs.todo.value = '';
                this.props.onAddTodo(todo);
            } else {
                this.refs.todo.focus();
            }
        },
        render: function () {
            return (
                <div>
                    <form onSubmit={this.addTodo}>
                        <input type="text" placeholder="New todo" ref="todo"/>
                        <input type="submit" value="Add new" className="button expanded"/>
                    </form>
                </div>
            );
        }
    })
    ;

module.exports = TodoForm;