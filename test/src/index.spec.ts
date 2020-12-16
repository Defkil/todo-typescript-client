import { expect } from 'chai';
import 'mocha';
import { index } from '../../src';
import { TodoController } from '../../src/controllers/todo.controller';

describe('Test index start file', () => {
    it('check exported index function', () => {
        // @ts-ignore
        globalThis.document = { querySelector: () => {
                return { addEventListener: () => {} }
        }}
        const app = index()
        expect(app instanceof TodoController).to.be.true
    });
});
