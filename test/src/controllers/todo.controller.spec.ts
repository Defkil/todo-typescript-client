import { expect } from 'chai';
import 'mocha';
import {TodoController} from '../../../src/controllers/todo.controller';
import {TodoView} from '../../../src/views/todo.view';
import {TaskModel} from '../../../src/models/task.model';
import {IHandlerAddTask, IHandlerDeleteTask, ITask} from '../../../src/index.interface';

const TEST_DATA_1 = 'Lorem ipsum',
    TEST_DATA_2 = 'dolor sit amet'

describe('Test todo controller', () => {
    // @ts-ignore
    globalThis.document = { querySelector: () => {
            return { addEventListener: () => {} }
    }}
    it('Test bindAddTask with no task name', (done) => {
        class MockTodoView extends TodoView{
            bindAddTask(handler: (dataAdd: IHandlerAddTask) => void): void {
                handler({name: '', description: ''})
            }
            displayNotification(msg: string): void {
                expect(msg).to.equal('Missing Todo Name')
                done()
            }
        }
        const app = new TodoController(new MockTodoView(), new TaskModel())
        app.start()
    });

    it('Test bindAddTask with a task', (done) => {
        class MockTodoView extends TodoView {
            bindAddTask(handler: (dataAdd: IHandlerAddTask) => void): void {
                handler({name: TEST_DATA_1, description: TEST_DATA_2})
            }
            displayNotification(msg: string): void {
                expect(msg).to.equal('Task added')
                done()
            }
        }
        class MockTaskModel extends TaskModel {
            addTask(taskData: IHandlerAddTask): void {
                expect(taskData).to.deep.equal({
                    name: TEST_DATA_1,
                    description: TEST_DATA_2
                })
            }
        }
        const app = new TodoController(new MockTodoView(), new MockTaskModel())
        app.start()
    });

    it('Test handleDeleteTask', (done) => {
        let notificationCounter = 0
        class MockTodoView extends TodoView {
            bindAddTask(handler: (dataAdd: IHandlerAddTask) => void): void {
                // add data which will be deleted
                handler({name: TEST_DATA_1, description: TEST_DATA_2})
            }
            displayNotification(msg: string): void {
                if(notificationCounter === 0) {
                    expect(msg).to.equal('Task added')
                    notificationCounter++
                } else {
                    expect(msg).to.equal('Task deleted')
                    done()
                }
            }
            bindDeleteTask(handler: (dataDelete: IHandlerDeleteTask) => void): void {
                handler({id: 1})
            }
        }
        class MockTaskModel extends TaskModel {
            addTask(taskData: IHandlerAddTask): void {
                expect(taskData).to.deep.equal({
                    name: TEST_DATA_1,
                    description: TEST_DATA_2
                })
            }
            deleteTask(data: IHandlerDeleteTask): void {
                expect(data).to.deep.equal({ id: 1 })
            }
        }
        const app = new TodoController(new MockTodoView(), new MockTaskModel())
        app.start()
    });

    it('Test onTasksChanged', (done) => {
        class MockTodoView extends TodoView {
            updateTasks(tasks: ITask[]): void {
                expect(tasks).to.deep.equal([{
                    id: 1,
                    name: TEST_DATA_1,
                    description: TEST_DATA_2
                }])
                done()
            }
        }
        class MockTaskModel extends TaskModel {
            bindOnChange(cb: (data: ITask[])=> void): void {
                cb([{
                    id: 1,
                    name: TEST_DATA_1,
                    description: TEST_DATA_2
                }])
            }
        }
        const app = new TodoController(new MockTodoView(), new MockTaskModel())
        app.start()
    });
});
