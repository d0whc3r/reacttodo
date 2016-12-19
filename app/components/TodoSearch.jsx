var React = require('react');

var TodoSearch = React.createClass({
        propTypes: {
            onSearch: React.PropTypes.func.isRequired
        },
        changeSearch: function () {
            var show = this.refs.showcompleted.checked;
            var search = this.refs.searchtext.value;
            this.props.onSearch(show, search);
        },
        render: function () {
            return (
                <div>
                    <form onSubmit={this.addTodo}>
                        <div>
                            <input type="search" placeholder="Search todo" ref="searchtext" onChange={this.changeSearch}/>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" value="1" ref="showcompleted" onChange={this.changeSearch}/>
                                Show completed?
                            </label>
                        </div>
                    </form>
                </div>
            );
        }
    })
    ;

module.exports = TodoSearch;