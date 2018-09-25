import {validate} from './NotEmpty';
import {expect} from 'chai';
import 'mocha';

describe('NotEmpty', () => {
    it('positive', () => {
        expect(validate('d', false)).to.equal(true);
        expect(validate(' ', false)).to.equal(true);
        expect(validate([' '], false)).to.equal(true);
        const set: Set<string> = new Set();
        set.add('first element');
        expect(validate(['text', 3, [1], set],  true)).to.equal(true);

    });
    it('negative', () => {
        expect(validate([''], false)).to.equal(false);
        expect(validate('', false)).to.equal(false);
        expect(validate([], false)).to.equal(false);
        expect(validate([12, ''], true)).to.equal(false);
        expect(validate(['text', 3, [], 1], true)).to.equal(false);
        const set: Set<string> = new Set();
        expect(validate(['text', 3, [1], set],  true)).to.equal(false);

    });

});


