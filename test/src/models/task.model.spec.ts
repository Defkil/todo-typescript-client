import { expect } from 'chai';
import 'mocha';
import {TaskModel} from '../../../src/models/task.model';

const TEST_DATA_1 = 'Lorem ipsum',
    TEST_DATA_2 = 'dolor sit amet'

describe('Test task model', () => {
    it('Add two tasks', (done) => {
        const taskModel = new TaskModel()
        taskModel.bindOnChange((data) => {
            expect(data[0].id).to.equal(1)
            expect(data[0].name).to.equal(TEST_DATA_1)
            expect(data[0].description).to.equal(TEST_DATA_2)
            if(data.length === 2) {
                expect(data[1].id).to.equal(2)
                expect(data[1].name).to.equal(TEST_DATA_2)
                expect(data[1].description).to.equal(TEST_DATA_1)
                done()
            }
        })
        taskModel.addTask({
            name: TEST_DATA_1,
            description: TEST_DATA_2
        })
        taskModel.addTask({
            name: TEST_DATA_2,
            description: TEST_DATA_1
        })
    });

    it('Add a task and delete it', (done) => {
        const taskModel = new TaskModel()
        let runCounter = 0
        taskModel.bindOnChange((data) => {
            if(runCounter === 0) {
                expect(data[0].id).to.equal(1)
                expect(data[0].name).to.equal(TEST_DATA_1)
                expect(data[0].description).to.equal(TEST_DATA_2)
                runCounter++
            } else {
                expect(data.length).to.equal(0)
                done()
            }
        })
        taskModel.addTask({
            name: TEST_DATA_1,
            description: TEST_DATA_2
        })
        taskModel.deleteTask({id: 1})
    });

    it('Try to delete a not existing task', (done) => {
        const taskModel = new TaskModel()
        let runCounter = 0
        taskModel.bindOnChange((data) => {
            expect(data.length).to.equal(0)
            done()
        })
        taskModel.deleteTask({id: 1})
    });
});
