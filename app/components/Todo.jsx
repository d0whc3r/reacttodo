var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
    propTypes: {
        onToggle: React.PropTypes.func.isRequired
    },
    render: function () {
        var {id, text, completed, createdAt, completedAt} = this.props;
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
            <div onClick={() => {
                this.props.onToggle(id);
            }}>
                <input type="checkbox" checked={completed}/>
                <p>{text}</p>
                <p>{renderDate()}</p>
            </div>
        );
    }
});

module.exports = Todo;