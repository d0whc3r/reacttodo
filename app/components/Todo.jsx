var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');

var actions = require('actions');

export var Todo = React.createClass({
    render: function () {
        var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
        var todoCls = completed ? 'todo todo-completed' : 'todo';
        var renderDate = () => {
            var msg = 'Created ';
            var timestamp = createdAt;
            if (completed) {
                msg = 'Completed ';
                timestamp = completedAt;
            }
            return msg + moment.unix(timestamp).format('MMM Do YYYY @ HH:mm');
        };

        return (
            <div className={todoCls} onClick={() => {
                dispatch(actions.startToggleTodo(id, !completed));
            }}>
                <div>
                    <input type="checkbox" checked={completed}/>
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
            </div>
        );
    }
});

export default connect()(Todo);