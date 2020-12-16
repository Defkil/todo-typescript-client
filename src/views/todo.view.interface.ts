import { ITask, IHandlerAddTask, IHandlerDeleteTask } from '../index.interface';

/**
 * View with notification and update functions
 * and handler for adding and deleting tasks
 */
export interface ITodoView {
    /**
     * Show a message as popup or 'toast' like materialize calls it
     *
     * @param msg string that should be showed
     */
    displayNotification(msg: string): void

    /**
     * Functions that will be fired when tasks are changed
     *
     * @param tasks
     */
    updateTasks(tasks: ITask[]): void

    /**
     * Register handler when a task is added
     *
     * @param handler function that will be fired if a task is added
     */
    bindAddTask(handler: (dataAdd: IHandlerAddTask) => void): void

    /**
     * Register handler when a task is deleted
     *
     * @param handler function that will be fired if a task is deleted
     */
    bindDeleteTask(handler: (dataDelete: IHandlerDeleteTask) => void): void
}
