import { validate } from './Future';
import { expect } from 'chai';
import 'mocha';

describe('Future', () => {
    it( 'is past',() => {
        expect(validate(new Date())).to.equal(false);
        expect(validate(new Date(Date.now()  - (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).to.equal(false);
    });
    it( 'is future',() => {
        expect(validate(new Date(Date.now()  + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).to.equal(true);
    });
});


