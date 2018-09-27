import {validate} from './ISBN';
import {expect} from 'chai';
import 'mocha';

describe('ISBN', () => {
    it('valid', () => {
        const validISBN = [
            //Without prefix:
            '048665088X',
            '0306406152',
            '9788371815102',
            //With prefix:
            'ISBN 048665088X',
            'ISBN: 048665088X',
            'ISBN-10 048665088X',
            'ISBN-13 048665088X',
            'ISBN-10: 048665088X',
            'ISBN-13: 048665088X',
            'isbn 048665088X',
            'isbn: 048665088X',
            'isbn-10 048665088X',
            'isbn-13 048665088X',
            'isbn-10: 048665088X',
            'isbn-13: 048665088X'
        ];
        validISBN.forEach(isbn => {
            expect(validate(isbn)).toBeTruthy();
        });
        expect(validate('2001:cdba:0000:0000:0000:0000:3257:9652')).to.equal(true);
        expect(validate('2001:cdba:0:0:0:0:3257:9652')).to.equal(true);
        expect(validate('2001:cdba::3257:9652')).to.equal(true);
        expect(validate('2001:0000:3238:DFE1:0063:0000:0000:FEFB')).to.equal(true);
    });
    it('invalid', () => {
        const invalidISBN = [
            //Without prefix:
            '048665088A',    //invalid letter 'A'
            '03064061521',   //too many digits (11)
            '030640615',     //not enought digits (9)
            //With prefix:
            'ISBN048665088X',     //after 'ISBN' hav to been ':' or space
            'ISBN:048665088X',    //after ':' have to been space
            'ISBN-10:048665088X', //after ':' have to been space
            'ISBN-13:048665088X'  //after ':' have to been space
        ];
        invalidISBN.forEach(isbn => {
            expect(validate(isbn)).toBeFalsy();
        });
    });
});


