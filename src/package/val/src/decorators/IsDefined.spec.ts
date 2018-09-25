import { validate } from './IsDate';
import { expect } from 'chai';
import 'mocha';

describe('IsDefined', () => {
    it( 'is date',() => {
        expect(validate(new Date())).to.equal(true);
    });
    it( 'no number date',() => {
        expect(validate( Date.now())).to.equal(false);
    });
    it( 'no string date',() => {
        expect(validate( 'Mon Sep 24 2018')).to.equal(false);
    });
});


