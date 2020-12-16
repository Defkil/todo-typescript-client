import { ITodoView } from '../views/todo.view.interface';
import { ITodoModel } from '../models/task.model.interface';

/**
 * Controller for the todo app
 */
export interface ITodoController {
    /** View of the app */
    todoView: ITodoView

    /** Task model */
    todoModel: ITodoModel
}
