import { TodoView } from './views/todo.view';
import { TodoController } from './controllers/todo.controller';
import { TaskModel } from './models/task.model';
import { ITodoController } from "./controllers/todo.controller.interface";

/**
 * Start function
 *
 * run controller with [[TodoView]] and [[TaskModel]]
 * @return app
 */
export function index(): ITodoController {
    const app = new TodoController(new TodoView, new TaskModel)
    app.start()
    return app
}

/* istanbul ignore next */
if (typeof window !== 'undefined') index()
