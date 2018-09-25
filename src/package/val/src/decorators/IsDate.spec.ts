import { validate } from './IsDate';
import { expect } from 'chai';
import 'mocha';

describe('IsDate', () => {
    it( 'positive',() => {
        expect(validate(new Date())).to.equal(true);
    });
    it( 'negative',() => {
        expect(validate( Date.now())).to.equal(false);
        expect(validate( 'Mon Sep 24 2018')).to.equal(false);
    });

});


