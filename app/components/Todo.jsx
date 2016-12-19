var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
    propTypes: {
        onToggle: React.PropTypes.func.isRequired
    },
    render: function () {
        var {id, text, completed, createdAt, completedAt} = this.props;
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
                this.props.onToggle(id);
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

module.exports = Todo;