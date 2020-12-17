define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TaskModel = void 0;
    var TaskModel = (function () {
        function TaskModel() {
            this._onListChanged = function () { return; };
            this.tasks = [];
        }
        TaskModel.prototype._commit = function (tasks) {
            this._onListChanged(tasks);
        };
        TaskModel.prototype.addTask = function (taskData) {
            this.tasks.push({
                id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
                name: taskData.name,
                description: taskData.description
            });
            this._commit(this.tasks);
        };
        TaskModel.prototype.deleteTask = function (data) {
            this.tasks = this.tasks.filter(function (todo) { return todo.id !== data.id; });
            this._commit(this.tasks);
        };
        TaskModel.prototype.bindOnChange = function (cb) {
            this._onListChanged = cb;
        };
        return TaskModel;
    }());
    exports.TaskModel = TaskModel;
});
//# sourceMappingURL=task.model.js.map