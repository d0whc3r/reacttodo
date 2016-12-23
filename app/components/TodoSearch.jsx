var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export class TodoSearch extends React.Component {
    render() {
        var {dispatch, showCompleted, searchText}=this.props;
        return (
            <div className="container__header">
                <form onSubmit={this.addTodo}>
                    <div>
                        <input type="search" placeholder="Search todo" ref="searchtext" value={searchText}
                               onChange={() => {
                                   var text = this.refs.searchtext.value;
                                   dispatch(actions.setSearchText(text))
                               }}/>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" value="1" ref="showcompleted" checked={showCompleted}
                                   onChange={() => {
                                       dispatch(actions.toggleShowCompleted());
                                   }}/>
                            Show completed?
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        showCompleted: state.showCompleted,
        searchText: state.searchText
    }
})(TodoSearch);