import {validate} from './IPv4';
import {expect} from 'chai';
import 'mocha';

describe('IPv4', () => {
    it('valid', () => {
        expect(validate('0.0.0.0')).to.equal(true);
        expect(validate('10.0.0.0')).to.equal(true);
        expect(validate('100.64.0.0')).to.equal(true);
        expect(validate('127.0.0.0')).to.equal(true);
        expect(validate('169.254.0.0')).to.equal(true);
        expect(validate('172.16.0.0')).to.equal(true);
        expect(validate('192.0.0.0')).to.equal(true);
        expect(validate('192.0.0.0')).to.equal(true);
        expect(validate('192.0.2.0')).to.equal(true);
        expect(validate('192.88.99.0')).to.equal(true);
        expect(validate('192.168.0.0')).to.equal(true);
        expect(validate('198.18.0.0')).to.equal(true);
        expect(validate('198.51.100.0')).to.equal(true);
        expect(validate('203.0.113.0')).to.equal(true);
        expect(validate('224.0.0.0')).to.equal(true);
        expect(validate('240.0.0.0')).to.equal(true);
        expect(validate('255.255.255.255')).to.equal(true);
    });
    it('invalid', () => {
        expect(validate('255.255.255.256')).to.equal(false);
        expect(validate('255.255.256.255')).to.equal(false);
        expect(validate('255.256.255.255')).to.equal(false);
        expect(validate('256.255.255.255')).to.equal(false);
        expect(validate('255.255.255.255.255')).to.equal(false);
        expect(validate('127.0.0.0.0')).to.equal(false);

    });
});


