import { ITodoModel } from './task.model.interface';
import { ITask, IHandlerAddTask, IHandlerDeleteTask} from '../index.interface';

/**
 * Basic implementation of the Model storing tasks in a array
 */
export class TaskModel implements ITodoModel {
    /** Handler that will be fired on change */
    private _onListChanged: (data: ITask[]) => void = () => { return }

    /** List of all tasks */
    tasks: ITask[] = []

    /**
     * Fire handler on tasks change
     *
     * @param tasks actual tasks that will be given to the handler
     * @private
     */
    private _commit(tasks: ITask[]): void {
        this._onListChanged(tasks)
    }

    /**
     * Add task to the model
     *
     * @param taskData task that should be added
     */
    addTask(taskData: IHandlerAddTask): void {
        this.tasks.push({
            id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
            name: taskData.name,
            description: taskData.description
        })
        this._commit(this.tasks)
    }

    /**
     * Delete a task from the model
     *
     * @param data ID of the tasks that should be deleted
     */
    deleteTask(data: IHandlerDeleteTask): void {
        this.tasks = this.tasks.filter(todo => todo.id !== data.id)
        this._commit(this.tasks)
    }

    /**
     * Set handler that will be fired on change
     *
     * @param cb function that will be fired on change with new tasks in parameter
     */
    bindOnChange(cb: (data: ITask[])=> void): void {
        this._onListChanged = cb
    }
}
