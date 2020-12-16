import { expect } from 'chai';
import 'mocha';
import {TodoView} from '../../../src/views/todo.view';
import {IHandlerDeleteTask} from "../../../src/index.interface";

const TEST_DATA_1 = 'Lorem ipsum',
    TEST_DATA_2 = 'dolor sit amet'

describe('Test todo.views', () => {
    it('Bind handler for add task', (done) => {
        let preventDefaultCheck = false
        // @ts-ignore
        globalThis.document = {
            querySelector: (data) => {
                if(data === '#task_name') return { value: TEST_DATA_1 }
                else if(data === '#task_description') return { value: TEST_DATA_2 }
                else if(data === '#task_button') return {
                    addEventListener: (eventType, listener) => {
                        expect(eventType).to.equal('click')
                        listener({preventDefault: () => {
                            preventDefaultCheck = true
                        }})
                    }
                }
            }
        }
        const view = new TodoView
        view.bindAddTask((dataAdd) => {
            expect(preventDefaultCheck).to.equal(true)
            expect(dataAdd.name).to.equal(TEST_DATA_1)
            expect(dataAdd.description).to.equal(TEST_DATA_2)
            done()
        })
    });

    it('Send a Toast message', (done) => {
        // @ts-ignore
        globalThis.document = {
            querySelector: () => {}
        }
        globalThis.M = {
            toast: (data) => {
                expect(data.html).to.equal(TEST_DATA_1)
                done()
            }
        }
        const view = new TodoView
        view.displayNotification(TEST_DATA_1)
    });

    it('Test updateTasks with one task', (done) => {
        let pointerTaskContainer
        globalThis.document = {
            // @ts-ignore
            createElement: (tagName) => {
                let mockElm = {
                    tagName,
                    addEventListener: (type, listener) => {
                        expect(type).to.equal('click')
                        listener()
                    },
                    appendChild: (child) => {
                        mockElm.childs.push(child)
                    },
                    childs: []
                }
                return mockElm
            },
            querySelector: (selector) => {
                let mockElm = {
                    selector,
                    innerHTML: '',
                    appendChild: (child) => {
                        mockElm.childs.push(child)
                    },
                    childs: []
                }
                if(selector === '#task-list') pointerTaskContainer = mockElm
                return mockElm
            }
        }
        const view = new TodoView
        view.bindDeleteTask((dataDelete: IHandlerDeleteTask) => {
            expect(dataDelete).to.deep.equal({id: 1})
        })
        view.updateTasks([{
            id: 1,
            name: TEST_DATA_1,
            description: TEST_DATA_2
        }])
        expect(pointerTaskContainer.childs[0].childs[0].childs[0].childs[0].childs[0].innerText).to.equal(TEST_DATA_1)
        expect(pointerTaskContainer.childs[0].childs[0].childs[0].childs[0].childs[1].innerText).to.equal(TEST_DATA_2)
        done()
    });
});
