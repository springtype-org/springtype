import { validate } from './IsString';
import { expect } from 'chai';
import 'mocha';

describe('IsString', () => {
    it( 'positive',() => {
        expect(validate('')).to.equal(true);
        expect(validate('me')).to.equal(true);
        expect(validate('12e3')).to.equal(true);
        expect(validate(new String(134))).to.equal(true);
    });
    it( 'negative',() => {
        expect(validate( null)).to.equal(false);
        expect(validate( 123)).to.equal(false);
    });

});


