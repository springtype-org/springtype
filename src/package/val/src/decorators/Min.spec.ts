import {validateNumber, validateDate} from './Min';
import {expect} from 'chai';
import 'mocha';

describe('Min', () => {
    it('positive', () => {
        expect(validateNumber(12, 12)).to.equal(true);
        expect(validateNumber(12, 0)).to.equal(true);
        expect(validateNumber(12, -12)).to.equal(true);
        expect(validateNumber(24, 12)).to.equal(true);
        expect(validateNumber(-0, +0)).to.equal(true);
        const currentMillis = Date.now();
        const constantDate = new Date(currentMillis);
        const olderDate = new Date(currentMillis + 20)
        expect(validateDate(constantDate, constantDate)).to.equal(true);
        expect(validateDate(olderDate, constantDate)).to.equal(true);

    });
    it('negative', () => {
        const currentMillis = Date.now();
        const constantDate = new Date(currentMillis);
        const youngerDate = new Date(currentMillis - 1000)
        expect(validateNumber(-24, 12)).to.equal(false);
        expect(validateNumber(-24, -12)).to.equal(false);
        expect(validateDate(youngerDate, constantDate)).to.equal(false);

    });

});


