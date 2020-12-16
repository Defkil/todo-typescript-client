import { ITodoView } from './todo.view.interface';
import { ITask , IHandlerAddTask, IHandlerDeleteTask } from '../index.interface';

/**
 * Toast information
 */
interface toastContent {
    html: string
}

/**
 * Namespace of materialize
 */
declare namespace M {
    /**
     * Display a message on the site
     *
     * @param data Toast information that will be shown
     */
    function toast(data: toastContent): void
}

/**
 * Basic implementation of the view for html
 */
export class TodoView implements ITodoView {
    /** Form input element with task name */
    private _addTaskName: HTMLInputElement

    /** Form input element with task description */
    private _addTaskDescription: HTMLInputElement

    /** Form button element for adding tasks */
    private _addTaskButton: HTMLLinkElement

    /** Container element where tasks will be added */
    private _taskContainer: HTMLDivElement

    /** Custom handler that will be fired if a task should be deleted */
    private _handlerDeleteTask: (dataDelete: IHandlerDeleteTask) => void = () => { return }

    /**
     * Set all variables to the elements
     */
    constructor() {
        this._addTaskName = document.querySelector('#task_name') as HTMLInputElement
        this._addTaskDescription = document.querySelector('#task_description') as HTMLInputElement
        this._addTaskButton = document.querySelector('#task_button') as HTMLLinkElement
        this._taskContainer = document.querySelector('#task-list') as HTMLDivElement
    }

    /**
     * Get values from task form
     *
     * @private
     */
    private _addTaskValues(): IHandlerAddTask {
        return {
            name: this._addTaskName.value,
            description: this._addTaskDescription.value
        }
    }

    /**
     * Reset add task form
     *
     * @private
     */
    private _addTaskReset(): void {
        this._addTaskName.value = ''
        this._addTaskDescription.value = ''
    }


    /**
     * Create HTMLDivElement based on all tasks
     *
     * @param task List of all tasks
     * @return HTMLDivElement based on all tasks
     * @private
     */
    private _createTask(task: ITask): HTMLDivElement {
        const card = document.createElement('div')
        card.className = 'card blue-grey darken-1'

        const taskElement = document.createElement('div')
        taskElement.className = 'row task-element'

        const taskContainer = document.createElement('div')
        taskContainer.className = 'col s11'

        const taskContent = document.createElement('div')
        taskContent.className = 'row'

        const taskName = document.createElement('div')
        taskName.className = 'col s12'
        taskName.innerText = task.name

        const taskDescription = document.createElement('div')
        taskDescription.className = 'col s12'
        taskDescription.innerText = task.description

        const taskDeleteContainer = document.createElement('div')
        taskDeleteContainer.className = 'col s1'

        const taskDeleteLink = document.createElement('a')
        taskDeleteLink.className = 'btn-floating btn-large waves-effect waves-light red'
        taskDeleteLink.addEventListener('click', () => {
            this._handlerDeleteTask({id: task.id})
        })

        const taskDeleteIcon = document.createElement('i')
        taskDeleteIcon.className = 'material-icons'
        taskDeleteIcon.innerText = 'delete'

        // tasks info
        taskContent.appendChild(taskName)
        taskContent.appendChild(taskDescription)
        taskContainer.appendChild(taskContent)

        // delete button
        taskDeleteLink.appendChild(taskDeleteIcon)
        taskDeleteContainer.appendChild(taskDeleteLink)

        // set together
        taskElement.appendChild(taskContainer)
        taskElement.appendChild(taskDeleteContainer)
        card.appendChild(taskElement)

        return card
    }

    /**
     * Functions that will be fired when tasks are changed
     *
     * @param tasks
     */
    updateTasks(tasks: ITask[]): void {
        this._taskContainer.innerHTML = ''
        tasks.forEach((task) => {
            this._taskContainer.appendChild(this._createTask(task))
        })
    }

    /**
     * Register handler when a task is added
     *
     * @param handler function that will be fired if a task is added
     */
    bindAddTask(handler: (dataAdd: IHandlerAddTask) => void): void {
        return this._addTaskButton.addEventListener('click', event => {
            event.preventDefault()
            const data = this._addTaskValues()
            this._addTaskReset()
            handler(data)
        })
    }

    /**
     * Register handler when a task is deleted
     *
     * @param handler function that will be fired if a task is deleted
     */
    bindDeleteTask(handler: (dataDelete: IHandlerDeleteTask) => void): void {
        this._handlerDeleteTask = handler
    }

    /**
     * Display a message on the site
     *
     * @param msg that will be shown
     */
    displayNotification(msg: string): void {
        M.toast({html: msg})
    }
}
