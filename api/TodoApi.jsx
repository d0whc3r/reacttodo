var TodoApi = {};

TodoApi.setTodos = function (todos) {
    if ($.isArray(todos)) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
};

TodoApi.getTodos = function () {
    var data = localStorage.getItem('todos');
    var result = [];
    try {
        result = JSON.parse(data);
    } catch (e) {
        result = [];
    }
    return $.isArray(result) ? result : [];
};

module.exports = TodoApi;