var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var TodoForm = React.createClass({
        addTodo: function (e) {
            e.preventDefault();
            var {dispatch} = this.props;
            var todo = this.refs.todo.value;
            if (todo && todo.length) {
                this.refs.todo.value = '';
                dispatch(actions.startAddTodo(todo))
            } else {
                this.refs.todo.focus();
            }
        },
        render: function () {
            return (
                <div className="container__footer">
                    <form onSubmit={this.addTodo}>
                        <input type="text" placeholder="New todo" ref="todo"/>
                        <input type="submit" value="Add new" className="button expanded"/>
                    </form>
                </div>
            );
        }
    })
    ;

export default connect()(TodoForm);