define(["require", "exports", "./views/todo.view", "./controllers/todo.controller", "./models/task.model"], function (require, exports, todo_view_1, todo_controller_1, task_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.index = void 0;
    function index() {
        var app = new todo_controller_1.TodoController(new todo_view_1.TodoView, new task_model_1.TaskModel);
        app.start();
        return app;
    }
    exports.index = index;
    if (typeof window !== 'undefined')
        index();
});
//# sourceMappingURL=index.js.map