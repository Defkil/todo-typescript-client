import { Bar } from '../src';
import { expect } from 'chai';
import 'mocha';

describe('First test', () => {
    it('should return true', () => {
        const bar = new Bar();
        expect(bar.member).to.equal(true);
    });
});
