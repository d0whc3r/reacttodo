import React from 'react';
import {connect} from 'react-redux';
import Todo from 'Todo';
import TodoApi from 'TodoApi';

export class TodoList extends React.Component {
    render() {
        var {todos, showCompleted, searchText} = this.props;
        var renderTodos = () => {
            var filteredTodos = TodoApi.filterTodos(todos, showCompleted, searchText);
            if (!filteredTodos.length) {
                return (
                    <p className="container__message">Nothing to do</p>
                );
            }
            return filteredTodos.map((todo) => {
                return (<Todo key={todo.id} {...todo}/>);
            });
        };
        return (
            <div>
                {renderTodos()}
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(TodoList);