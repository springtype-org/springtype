import { validate } from './IsNumber';
import { expect } from 'chai';
import 'mocha';

describe('IsNumber', () => {
    it( 'positive',() => {
        expect(validate(12)).to.equal(true);
        expect(validate(12.2)).to.equal(true);
        expect(validate(12e3)).to.equal(true);
        expect(validate(-12e3)).to.equal(true);
        expect(validate(-0)).to.equal(true);
        expect(validate(+0)).to.equal(true);
        expect(validate(new Number(30))).to.equal(true);
    });
    it( 'negative',() => {
        expect(validate( null)).to.equal(false);
        expect(validate( '123')).to.equal(false);
    });

});


