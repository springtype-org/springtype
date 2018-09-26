import { validate } from './Length';
import { expect } from 'chai';
import 'mocha';

describe('Length', () => {
    it( 'positive',() => {
        expect(validate('test',4,4)).to.equal(true);
        expect(validate('test hallo',4,10)).to.equal(true);
    });
    it( 'negative',() => {
        expect(validate('test hallo',-4,10)).to.equal(false);
        expect(validate('test hallo',10,4)).to.equal(false);
        expect(validate('d',2,4)).to.equal(false);
        expect(validate('12345',2,4)).to.equal(false);
    });

});


