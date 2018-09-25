import {validate} from './Required';
import {expect} from 'chai';
import 'mocha';

describe('Required', () => {
    it('positive', () => {
        expect(validate(()=> {})).to.equal(true);
        expect(validate(1)).to.equal(true);
        expect(validate('')).to.equal(true);
        expect(validate(new Date())).to.equal(true);


    });
    it('negative', () => {
        expect(validate(null)).to.equal(false);
        expect(validate(undefined)).to.equal(false);
    });
});


