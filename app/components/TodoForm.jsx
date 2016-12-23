var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export class TodoForm extends React.Component {
    addTodo(e) {
        e.preventDefault();
        var {dispatch} = this.props;
        var todo = this.refs.todo.value;
        if (todo && todo.length) {
            this.refs.todo.value = '';
            dispatch(actions.startAddTodo(todo))
        } else {
            this.refs.todo.focus();
        }
    }

    render() {
        return (
            <div className="container__footer">
                <form onSubmit={this.addTodo.bind(this)}>
                    <input type="text" placeholder="New todo" ref="todo"/>
                    <input type="submit" value="Add new" className="button expanded"/>
                </form>
            </div>
        );
    }
}

export default connect()(TodoForm);