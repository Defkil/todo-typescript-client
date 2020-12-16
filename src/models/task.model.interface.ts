import { IHandlerAddTask, IHandlerDeleteTask } from '../index.interface';
import { ITask } from '../index.interface';

/**
 * Model for storing and manipulating tasks
 */
export interface ITodoModel {
    /** List of all tasks */
    tasks: ITask[]

    /**
     * Adding a task
     *
     * @param taskData task that should be added
     */
    addTask(taskData: IHandlerAddTask): void

    /**
     * Deleting a task
     *
     * @param taskData ID of the tasks that should be deleted
     */
    deleteTask(taskData: IHandlerDeleteTask): void

    /**
     * Set handler that will be fired on change
     *
     * @param cb function that will be fired on change with new tasks in parameter
     */
    bindOnChange(cb: (data: ITask[])=> void): void
}
