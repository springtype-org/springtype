import {validate} from './IPv6';
import {expect} from 'chai';
import 'mocha';

describe('IPv6', () => {
    it('valid', () => {

        expect(validate('2001:cdba:0000:0000:0000:0000:3257:9652')).to.equal(true);
        expect(validate('2001:cdba:0:0:0:0:3257:9652')).to.equal(true);
        expect(validate('2001:cdba::3257:9652')).to.equal(true);
        expect(validate('2001:0000:3238:DFE1:0063:0000:0000:FEFB')).to.equal(true);
    });
    it('invalid', () => {
        expect(validate('255.255.255.256')).to.equal(false);
        expect(validate('169.254.0.0')).to.equal(false);
        expect(validate('172.16.0.0')).to.equal(false);
        expect(validate('192.0.0.0')).to.equal(false);
        expect(validate('192.0.0.0')).to.equal(false);


    });
});


