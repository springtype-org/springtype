import {validate} from './NotNull';
import {expect} from 'chai';
import 'mocha';

describe('NotNull', () => {
    it('positive', () => {
        expect(validate('')).to.equal(true);
        expect(validate(undefined)).to.equal(true);


    });
    it('negative', () => {
        expect(validate(null)).to.equal(false);
    });

});


