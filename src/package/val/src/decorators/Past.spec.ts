import { validate } from './Past';
import { expect } from 'chai';
import 'mocha';

describe('Past', () => {
    it( 'is past',() => {
        expect(validate(new Date(Date.now()-10000))).to.equal(true);
        expect(validate(new Date(Date.now()  - (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).to.equal(true);
    });
    it( 'is future',() => {
        expect(validate(new Date(Date.now()  + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).to.equal(false);
    });
});


