var TodoApi = {
    filterTodos: function (todos, completed, text) {
        var filtered = todos;
        filtered = filtered.filter((todo) => !todo.completed || completed);
        filtered.sort((a, b) => {
            if (!a.completed && b.completed) {
                return -1;
            } else if (a.completed && !b.completed) {
                return 1;
            }
            return 0;
        });
        filtered = filtered.filter((todo) => {
            return todo.text.toLowerCase().indexOf(text.toLowerCase()) > -1 || !text.length;
        });

        return filtered;
    }
};

export default TodoApi;