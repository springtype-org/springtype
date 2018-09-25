import {validateNumber, validateDate} from './Range';
import {expect} from 'chai';
import 'mocha';

describe('Range', () => {
    it('positive', () => {
        const now = Date.now();
        const nowDate = new Date(now);
        const past = new Date(now - 20000);
        const future = new Date(now + 20000);
        expect(validateDate(nowDate, past,future)).to.equal(true);
        expect(validateDate(past,past,future)).to.equal(true);
        expect(validateDate(future,nowDate,future)).to.equal(true);
        expect(validateDate(nowDate,nowDate,nowDate)).to.equal(true);

        expect(validateNumber(0,-1,1)).to.equal(true);
        expect(validateNumber(2,0,2)).to.equal(true);
        expect(validateNumber(0,0,2)).to.equal(true);
        expect(validateNumber(0,0,0)).to.equal(true);

    });
    it('negative', () => {
        const now = Date.now();
        const nowDate = new Date(now);
        const past = new Date(now - 20000);
        const future = new Date(now + 20000);

        expect(validateDate(nowDate,past,past)).to.equal(false);
        expect(validateDate(nowDate,future,future)).to.equal(false);
        expect(validateDate(nowDate,future,past)).to.equal(false);

        expect(validateNumber(0,-1,-2)).to.equal(false);
        expect(validateNumber(0,1,2)).to.equal(false);
        expect(validateNumber(0,2,-1)).to.equal(false);
    });
});


