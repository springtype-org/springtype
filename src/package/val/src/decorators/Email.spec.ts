import { validate } from './Email';
import { expect } from 'chai';
import 'mocha';

describe('Email', () => {
    it( 'valid',() => {
        expect(validate('support@springtype.org')).to.equal(true);
        expect(validate('m.mansi1@springtype.org')).to.equal(true);
        expect(validate('me@opx.org.io')).to.equal(true);
    });
    it( 'invalid',() => {
        expect(validate('')).to.equal(false);
        expect(validate('name_part@domain_part')).to.equal(false);
        expect(validate('name@1@example.com')).to.equal(false);
        expect(validate('nfoo@bar@machine')).to.equal(false);
        expect(validate('nf\\oo@bar@machine')).to.equal(false);
    });
});


