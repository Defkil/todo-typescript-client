define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TodoView = void 0;
    var TodoView = (function () {
        function TodoView() {
            this._handlerDeleteTask = function () { return; };
            this._addTaskName = document.querySelector('#task_name');
            this._addTaskDescription = document.querySelector('#task_description');
            this._addTaskButton = document.querySelector('#task_button');
            this._taskContainer = document.querySelector('#task-list');
        }
        TodoView.prototype._addTaskValues = function () {
            return {
                name: this._addTaskName.value,
                description: this._addTaskDescription.value
            };
        };
        TodoView.prototype._addTaskReset = function () {
            this._addTaskName.value = '';
            this._addTaskDescription.value = '';
        };
        TodoView.prototype._createTask = function (task) {
            var _this = this;
            var card = document.createElement('div');
            card.className = 'card blue-grey darken-1';
            var taskElement = document.createElement('div');
            taskElement.className = 'row task-element';
            var taskContainer = document.createElement('div');
            taskContainer.className = 'col s11';
            var taskContent = document.createElement('div');
            taskContent.className = 'row';
            var taskName = document.createElement('div');
            taskName.className = 'col s12';
            taskName.innerText = task.name;
            var taskDescription = document.createElement('div');
            taskDescription.className = 'col s12';
            taskDescription.innerText = task.description;
            var taskDeleteContainer = document.createElement('div');
            taskDeleteContainer.className = 'col s1';
            var taskDeleteLink = document.createElement('a');
            taskDeleteLink.className = 'btn-floating btn-large waves-effect waves-light red';
            taskDeleteLink.addEventListener('click', function () {
                _this._handlerDeleteTask({ id: task.id });
            });
            var taskDeleteIcon = document.createElement('i');
            taskDeleteIcon.className = 'material-icons';
            taskDeleteIcon.innerText = 'delete';
            taskContent.appendChild(taskName);
            taskContent.appendChild(taskDescription);
            taskContainer.appendChild(taskContent);
            taskDeleteLink.appendChild(taskDeleteIcon);
            taskDeleteContainer.appendChild(taskDeleteLink);
            taskElement.appendChild(taskContainer);
            taskElement.appendChild(taskDeleteContainer);
            card.appendChild(taskElement);
            return card;
        };
        TodoView.prototype.updateTasks = function (tasks) {
            var _this = this;
            this._taskContainer.innerHTML = '';
            tasks.forEach(function (task) {
                _this._taskContainer.appendChild(_this._createTask(task));
            });
        };
        TodoView.prototype.bindAddTask = function (handler) {
            var _this = this;
            return this._addTaskButton.addEventListener('click', function (event) {
                event.preventDefault();
                var data = _this._addTaskValues();
                _this._addTaskReset();
                handler(data);
            });
        };
        TodoView.prototype.bindDeleteTask = function (handler) {
            this._handlerDeleteTask = handler;
        };
        TodoView.prototype.displayNotification = function (msg) {
            M.toast({ html: msg });
        };
        return TodoView;
    }());
    exports.TodoView = TodoView;
});
//# sourceMappingURL=todo.view.js.map