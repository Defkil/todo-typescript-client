import { ITodoController } from './todo.controller.interface';
import { ITodoView } from '../views/todo.view.interface';
import { IHandlerAddTask, IHandlerDeleteTask, ITask } from '../index.interface';
import { ITodoModel } from '../models/task.model.interface';

/**
 * Basic implementation of the controller
 */
export class TodoController implements ITodoController {
    /** View of the app */
    todoView: ITodoView

    /** Task model */
    todoModel: ITodoModel

    /**
     * Set View and Model
     *
     * @param todoView View of the app
     * @param todoModel Model of Tasks
     */
    constructor(todoView: ITodoView, todoModel: ITodoModel) {
        this.todoView = todoView
        this.todoModel = todoModel
    }

    /**
     * set binder in view and model
     */
    start(): void {
        this.todoView.bindAddTask((data) => this.handleAddTask(data))
        this.todoView.bindDeleteTask((data) => this.handleDeleteTask(data))
        this.todoModel.bindOnChange((data) => this.onTasksChanged(data))
    }

    /**
     * Handler for adding tasks
     *
     * @param data Task that will be added
     */
    handleAddTask(data: IHandlerAddTask): void {
        if(data.name === '') return this.todoView.displayNotification('Missing Todo Name')
        this.todoModel.addTask(data)
        this.todoView.displayNotification('Task added')
    }

    /**
     * Handler for deleting tasks
     *
     * @param data ID of the task which should be deleted
     */
    handleDeleteTask(data: IHandlerDeleteTask): void {
        this.todoModel.deleteTask(data)
        this.todoView.displayNotification('Task deleted')
    }

    /**
     * Listener on changing task
     *
     * @param tasks List of all actual tasks
     */
    onTasksChanged(tasks: ITask[]): void {
        this.todoView.updateTasks(tasks)
    }
}
