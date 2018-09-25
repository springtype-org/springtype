import {validateNumber, validateDate} from './Max';
import {expect} from 'chai';
import 'mocha';

describe('Max', () => {
    it('positive', () => {
        expect(validateNumber(12, 12)).to.equal(true);
        expect(validateNumber(0, 12)).to.equal(true);
        expect(validateNumber(-12, 12)).to.equal(true);
        expect(validateNumber(-24, -12)).to.equal(true);
        expect(validateNumber(-0, +0)).to.equal(true);
        const currentMillis = Date.now();
        const constantDate = new Date(currentMillis);
        const olderDate = new Date(currentMillis + 20)
        expect(validateDate(constantDate, constantDate)).to.equal(true);
        expect(validateDate(constantDate, olderDate)).to.equal(true);

    });
    it('negative', () => {
        const currentMillis = Date.now();
        const constantDate = new Date(currentMillis);
        const youngerDate = new Date(currentMillis - 1000)
        expect(validateNumber(24, -12)).to.equal(false);
        expect(validateNumber(-12, -24)).to.equal(false);
        expect(validateDate(constantDate, youngerDate)).to.equal(false);
    });

});


