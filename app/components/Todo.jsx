import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';

export class Todo extends React.Component {
    render() {
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
}

export default connect()(Todo);