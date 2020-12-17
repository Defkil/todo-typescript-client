define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TodoController = void 0;
    var TodoController = (function () {
        function TodoController(todoView, todoModel) {
            this.todoView = todoView;
            this.todoModel = todoModel;
        }
        TodoController.prototype.start = function () {
            var _this = this;
            this.todoView.bindAddTask(function (data) { return _this.handleAddTask(data); });
            this.todoView.bindDeleteTask(function (data) { return _this.handleDeleteTask(data); });
            this.todoModel.bindOnChange(function (data) { return _this.onTasksChanged(data); });
        };
        TodoController.prototype.handleAddTask = function (data) {
            if (data.name === '')
                return this.todoView.displayNotification('Missing Todo Name');
            this.todoModel.addTask(data);
            this.todoView.displayNotification('Task added');
        };
        TodoController.prototype.handleDeleteTask = function (data) {
            this.todoModel.deleteTask(data);
            this.todoView.displayNotification('Task deleted');
        };
        TodoController.prototype.onTasksChanged = function (tasks) {
            this.todoView.updateTasks(tasks);
        };
        return TodoController;
    }());
    exports.TodoController = TodoController;
});
//# sourceMappingURL=todo.controller.js.map