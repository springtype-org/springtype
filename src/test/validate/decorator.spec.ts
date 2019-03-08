import {assert, expect} from "chai";
import {
    validateCreditCard,
    validateDateMax,
    validateDateMin,
    validateDateRange,
    validateEmail,
    validateFuture,
    validateIBAN,
    validateIPv4,
    validateIPv6,
    validateISBN,
    validateIsDate,
    validateIsDefined,
    validateIsNumber,
    validateIsString,
    validateLength,
    validateNotEmpty,
    validateNotNull,
    validateNumberMax,
    validateNumberMin,
    validateNumberRange,
    validatePast,
    validateRequired
} from "@springtype/springtype-incubator-validate/src";
import 'mocha';
import {futureDate, now, nowDate, pastDate, ValidateOnClass, ValidateOnMethod} from "./helper/ValidateMe";

describe('validate', () => {
    describe('decorators', () => {
        describe('CreditCard', () => {
            it('valid', () => {
                expect(validateCreditCard('49927398716')).to.equal(true);
                expect(validateCreditCard('4485297637724400')).to.equal(true);
                expect(validateCreditCard('4485727825149861')).to.equal(true);
                expect(validateCreditCard('4929847923249092')).to.equal(true);
                expect(validateCreditCard('4024007185078382')).to.equal(true);
                expect(validateCreditCard('4024007149721325')).to.equal(true);
                expect(validateCreditCard('5161006306455396')).to.equal(true);
                expect(validateCreditCard('5252831751664014')).to.equal(true);
                expect(validateCreditCard('5109346796537161')).to.equal(true);
                expect(validateCreditCard('5391037036267084')).to.equal(true);
                expect(validateCreditCard('5138349638623392')).to.equal(true);
                expect(validateCreditCard('6011227287427713')).to.equal(true);
                expect(validateCreditCard('6011004888550312')).to.equal(true);
                expect(validateCreditCard('6011629938837598')).to.equal(true);
                expect(validateCreditCard('6011657675059423')).to.equal(true);
                expect(validateCreditCard('6011648593100068')).to.equal(true);
                expect(validateCreditCard('348601050374293')).to.equal(true);
                expect(validateCreditCard('374783347619412')).to.equal(true);
                expect(validateCreditCard('340534805505168')).to.equal(true);
                expect(validateCreditCard('371993993100368')).to.equal(true);
                expect(validateCreditCard('371523710389968')).to.equal(true);
                expect(validateCreditCard('123456789007')).to.equal(true);
                expect(validateCreditCard('123456789015')).to.equal(true);
                expect(validateCreditCard('123456789023')).to.equal(true);
                expect(validateCreditCard('123456789031')).to.equal(true);
                expect(validateCreditCard('123456789049')).to.equal(true);
                expect(validateCreditCard('123456789056')).to.equal(true);
                expect(validateCreditCard('123456789064')).to.equal(true);
                expect(validateCreditCard('123456789072')).to.equal(true);
                expect(validateCreditCard('123456789080')).to.equal(true);
                expect(validateCreditCard('123456789098')).to.equal(true);
                expect(validateCreditCard('123456789106')).to.equal(true);
                expect(validateCreditCard('123456789114')).to.equal(true);
                expect(validateCreditCard('123456789122')).to.equal(true);
                expect(validateCreditCard('123456789130')).to.equal(true);
                expect(validateCreditCard('123456789148')).to.equal(true);
                expect(validateCreditCard('123456789155')).to.equal(true);
                expect(validateCreditCard('123456789163')).to.equal(true);
                expect(validateCreditCard('123456789171')).to.equal(true);
                expect(validateCreditCard('123456789189')).to.equal(true);
                expect(validateCreditCard('123456789197')).to.equal(true);
                expect(validateCreditCard('123456789205')).to.equal(true);
                expect(validateCreditCard('123456789213')).to.equal(true);
                expect(validateCreditCard('123456789221')).to.equal(true);
                expect(validateCreditCard('123456789239')).to.equal(true);
                expect(validateCreditCard('123456789247')).to.equal(true);
                expect(validateCreditCard('123456789254')).to.equal(true);
                expect(validateCreditCard('123456789262')).to.equal(true);
                expect(validateCreditCard('123456789270')).to.equal(true);
                expect(validateCreditCard('123456789288')).to.equal(true);
                expect(validateCreditCard('123456789296')).to.equal(true);
                expect(validateCreditCard('123456789304')).to.equal(true);
                expect(validateCreditCard('123456789312')).to.equal(true);
                expect(validateCreditCard('123456789320')).to.equal(true);
                expect(validateCreditCard('123456789338')).to.equal(true);
                expect(validateCreditCard('123456789346')).to.equal(true);
                expect(validateCreditCard('123456789353')).to.equal(true);
                expect(validateCreditCard('123456789361')).to.equal(true);
                expect(validateCreditCard('123456789379')).to.equal(true);
                expect(validateCreditCard('123456789387')).to.equal(true);
                expect(validateCreditCard('123456789395')).to.equal(true);
                expect(validateCreditCard('123456789403')).to.equal(true);
                expect(validateCreditCard('123456789411')).to.equal(true);
                expect(validateCreditCard('123456789429')).to.equal(true);
                expect(validateCreditCard('123456789437')).to.equal(true);
                expect(validateCreditCard('123456789445')).to.equal(true);
                expect(validateCreditCard('123456789452')).to.equal(true);
                expect(validateCreditCard('123456789460')).to.equal(true);
                expect(validateCreditCard('123456789478')).to.equal(true);
                expect(validateCreditCard('123456789486')).to.equal(true);
                expect(validateCreditCard('123456789494')).to.equal(true);
                expect(validateCreditCard('123456789502')).to.equal(true);
                expect(validateCreditCard('123456789510')).to.equal(true);
                expect(validateCreditCard('123456789528')).to.equal(true);
                expect(validateCreditCard('123456789536')).to.equal(true);
                expect(validateCreditCard('123456789544')).to.equal(true);
                expect(validateCreditCard('123456789551')).to.equal(true);
                expect(validateCreditCard('123456789569')).to.equal(true);
                expect(validateCreditCard('123456789577')).to.equal(true);
                expect(validateCreditCard('123456789585')).to.equal(true);
                expect(validateCreditCard('123456789593')).to.equal(true);
                expect(validateCreditCard('123456789601')).to.equal(true);
                expect(validateCreditCard('123456789619')).to.equal(true);
                expect(validateCreditCard('123456789627')).to.equal(true);
                expect(validateCreditCard('123456789635')).to.equal(true);
                expect(validateCreditCard('123456789643')).to.equal(true);
                expect(validateCreditCard('123456789650')).to.equal(true);
                expect(validateCreditCard('123456789668')).to.equal(true);
                expect(validateCreditCard('123456789676')).to.equal(true);
                expect(validateCreditCard('123456789684')).to.equal(true);
                expect(validateCreditCard('123456789692')).to.equal(true);
                expect(validateCreditCard('123456789700')).to.equal(true);
                expect(validateCreditCard('123456789718')).to.equal(true);
                expect(validateCreditCard('123456789726')).to.equal(true);
                expect(validateCreditCard('123456789734')).to.equal(true);
                expect(validateCreditCard('123456789742')).to.equal(true);
                expect(validateCreditCard('123456789759')).to.equal(true);
                expect(validateCreditCard('123456789767')).to.equal(true);
                expect(validateCreditCard('123456789775')).to.equal(true);
                expect(validateCreditCard('123456789783')).to.equal(true);
                expect(validateCreditCard('123456789791')).to.equal(true);
                expect(validateCreditCard('123456789809')).to.equal(true);
                expect(validateCreditCard('123456789817')).to.equal(true);
                expect(validateCreditCard('123456789825')).to.equal(true);
                expect(validateCreditCard('123456789833')).to.equal(true);
                expect(validateCreditCard('123456789841')).to.equal(true);
                expect(validateCreditCard('123456789858')).to.equal(true);
                expect(validateCreditCard('123456789866')).to.equal(true);
                expect(validateCreditCard('123456789874')).to.equal(true);
                expect(validateCreditCard('123456789882')).to.equal(true);
                expect(validateCreditCard('123456789890')).to.equal(true);
                expect(validateCreditCard('123456789908')).to.equal(true);
                expect(validateCreditCard('123456789916')).to.equal(true);
                expect(validateCreditCard('123456789924')).to.equal(true);
                expect(validateCreditCard('123456789932')).to.equal(true);
                expect(validateCreditCard('123456789940')).to.equal(true);
                expect(validateCreditCard('123456789957')).to.equal(true);
                expect(validateCreditCard('123456789965')).to.equal(true);
                expect(validateCreditCard('123456789973')).to.equal(true);
                expect(validateCreditCard('123456789981')).to.equal(true);
                expect(validateCreditCard('123456789999')).to.equal(true);
                expect(validateCreditCard('4111111111111111')).to.equal(true);
                expect(validateCreditCard('4111-1111-1111-1111')).to.equal(true);
            });
            it('invalid', () => {
                expect(validateCreditCard('1445-5789-981')).to.equal(false);
            });
        });
        describe('Email', () => {
            it('valid', () => {
                expect(validateEmail('support@springtype.org')).to.equal(true);
                expect(validateEmail('m.mansi1@springtype.org')).to.equal(true);
                expect(validateEmail('me@opx.org.io')).to.equal(true);
            });
            it('invalid', () => {
                expect(validateEmail('')).to.equal(false);
                expect(validateEmail('name_part@domain_part')).to.equal(false);
                expect(validateEmail('name@1@example.com')).to.equal(false);
                expect(validateEmail('nfoo@bar@machine')).to.equal(false);
                expect(validateEmail('nf\\oo@bar@machine')).to.equal(false);
            });
        });
        describe('Future', () => {
            it('is past', () => {
                expect(validateFuture(new Date())).to.equal(false);
                expect(validateFuture(new Date(Date.now() - (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).to.equal(false);
            });
            it('is future', () => {
                expect(validateFuture(new Date(Date.now() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).to.equal(true);
            });
        });
        describe('IBAN', () => {
            it('valid', () => {
                expect(validateIBAN('DE89 3704 0044 0532 0130 00')).to.equal(true);
                expect(validateIBAN('DE89-3704-0044-0532-0130-00')).to.equal(true);
                expect(validateIBAN('DE89/3704/0044/0532/0130/00')).to.equal(true);
                expect(validateIBAN('AT483200000012345864')).to.equal(true);
                expect(validateIBAN('BE71096123456769')).to.equal(true);
                expect(validateIBAN('BG18RZBB91550123456789')).to.equal(true);
                expect(validateIBAN('HR1723600001101234565')).to.equal(true);
                expect(validateIBAN('CY21002001950000357001234567')).to.equal(true);
                expect(validateIBAN('CZ5508000000001234567899')).to.equal(true);
                expect(validateIBAN('FO9264600123456789')).to.equal(true);
                expect(validateIBAN('GL8964710123456789')).to.equal(true);
                expect(validateIBAN('DK9520000123456789')).to.equal(true);
                expect(validateIBAN('EE471000001020145685')).to.equal(true);
                expect(validateIBAN('FI1410093000123458')).to.equal(true);
                expect(validateIBAN('FR7630006000011234567890189')).to.equal(true);
                expect(validateIBAN('DE91100000000123456789')).to.equal(true);
                expect(validateIBAN('GI04BARC000001234567890')).to.equal(true);
                expect(validateIBAN('GR9608100010000001234567890')).to.equal(true);
                expect(validateIBAN('HU93116000060000000012345676')).to.equal(true);
                expect(validateIBAN('IS030001121234561234567890')).to.equal(true);
                expect(validateIBAN('IE64IRCE92050112345678')).to.equal(true);
                expect(validateIBAN('IT60X0542811101000000123456')).to.equal(true);
                expect(validateIBAN('LV97HABA0012345678910')).to.equal(true);
                expect(validateIBAN('LI7408806123456789012')).to.equal(true);
                expect(validateIBAN('LT601010012345678901')).to.equal(true);
                expect(validateIBAN('LU120010001234567891')).to.equal(true);
                expect(validateIBAN('MT31MALT01100000000000000000123')).to.equal(true);
                expect(validateIBAN('MC5810096180790123456789085')).to.equal(true);
                expect(validateIBAN('NL02ABNA0123456789')).to.equal(true);
                expect(validateIBAN('NO8330001234567')).to.equal(true);
                expect(validateIBAN('PL10105000997603123456789123')).to.equal(true);
                expect(validateIBAN('PT50002700000001234567833')).to.equal(true);
                expect(validateIBAN('RO09BCYP0000001234567890')).to.equal(true);
                expect(validateIBAN('SM76P0854009812123456789123')).to.equal(true);
                expect(validateIBAN('SK8975000000000012345671')).to.equal(true);
                expect(validateIBAN('SI56192001234567892')).to.equal(true);
                expect(validateIBAN('ES7921000813610123456789')).to.equal(true);
                expect(validateIBAN('SE7280000810340009783242')).to.equal(true);
                expect(validateIBAN('CH5604835012345678009')).to.equal(true);
                expect(validateIBAN('GB98MIDL07009312345678')).to.equal(true);
            });
            it('invalid', () => {
                expect(validateIBAN('AL35202111090000000001234567')).to.equal(false);
                expect(validateIBAN('TG53TG0090604310346500400070')).to.equal(false);
                expect(validateIBAN('DZ580002100001113000000570')).to.equal(false);
                expect(validateIBAN('AO06004400006729503010102')).to.equal(false);
                expect(validateIBAN('BJ66BJ0610100100144390000769')).to.equal(false);
                expect(validateIBAN('BF42BF0840101300463574000390')).to.equal(false);
                expect(validateIBAN('BI43201011067444')).to.equal(false);
                expect(validateIBAN('CM2110002000300277976315008')).to.equal(false);
                expect(validateIBAN('CV64000500000020108215144')).to.equal(false);
                expect(validateIBAN('CF4220001000010120069700160')).to.equal(false);
                expect(validateIBAN('TD8960002000010271091600153')).to.equal(false);
                expect(validateIBAN('KM4600005000010010904400137')).to.equal(false);
                expect(validateIBAN('CG3930011000101013451300019')).to.equal(false);
                expect(validateIBAN('DJ2110002010010409943020008')).to.equal(false);
                expect(validateIBAN('EG2100037000671002392189379')).to.equal(false);
                expect(validateIBAN('GQ7050002001003715228190196')).to.equal(false);
                expect(validateIBAN('GA2140021010032001890020126')).to.equal(false);
                expect(validateIBAN('GW04GW1430010181800637601')).to.equal(false);
                expect(validateIBAN('HN54PISA00000000000000123124')).to.equal(false);
                expect(validateIBAN('IR710570029971601460641001')).to.equal(false);
                expect(validateIBAN('CI93CI0080111301134291200589')).to.equal(false);
                expect(validateIBAN('MG4600005030071289421016045')).to.equal(false);
                expect(validateIBAN('ML13ML0160120102600100668497')).to.equal(false);
                expect(validateIBAN('MA64011519000001205000534921')).to.equal(false);
                expect(validateIBAN('MZ59000301080016367102371')).to.equal(false);
                expect(validateIBAN('NI92BAMC000000000000000003123123')).to.equal(false);
                expect(validateIBAN('NE58NE0380100100130305000268')).to.equal(false);
                expect(validateIBAN('SN08SN0100152000048500003035')).to.equal(false);
                expect(validateIBAN('TG53TG0090604310346500400070')).to.equal(false);
            });
        });
        describe('IPv4', () => {
            it('valid', () => {
                expect(validateIPv4('0.0.0.0')).to.equal(true);
                expect(validateIPv4('10.0.0.0')).to.equal(true);
                expect(validateIPv4('100.64.0.0')).to.equal(true);
                expect(validateIPv4('127.0.0.0')).to.equal(true);
                expect(validateIPv4('169.254.0.0')).to.equal(true);
                expect(validateIPv4('172.16.0.0')).to.equal(true);
                expect(validateIPv4('192.0.0.0')).to.equal(true);
                expect(validateIPv4('192.0.0.0')).to.equal(true);
                expect(validateIPv4('192.0.2.0')).to.equal(true);
                expect(validateIPv4('192.88.99.0')).to.equal(true);
                expect(validateIPv4('192.168.0.0')).to.equal(true);
                expect(validateIPv4('198.18.0.0')).to.equal(true);
                expect(validateIPv4('198.51.100.0')).to.equal(true);
                expect(validateIPv4('203.0.113.0')).to.equal(true);
                expect(validateIPv4('224.0.0.0')).to.equal(true);
                expect(validateIPv4('240.0.0.0')).to.equal(true);
                expect(validateIPv4('255.255.255.255')).to.equal(true);
            });
            it('invalid', () => {
                expect(validateIPv4('255.255.255.256')).to.equal(false);
                expect(validateIPv4('255.255.256.255')).to.equal(false);
                expect(validateIPv4('255.256.255.255')).to.equal(false);
                expect(validateIPv4('256.255.255.255')).to.equal(false);
                expect(validateIPv4('255.255.255.255.255')).to.equal(false);
                expect(validateIPv4('127.0.0.0.0')).to.equal(false);

            });
        });
        describe('IPv6', () => {
            it('valid', () => {

                expect(validateIPv6('2001:cdba:0000:0000:0000:0000:3257:9652')).to.equal(true);
                expect(validateIPv6('2001:cdba:0:0:0:0:3257:9652')).to.equal(true);
                expect(validateIPv6('2001:cdba::3257:9652')).to.equal(true);
                expect(validateIPv6('2001:0000:3238:DFE1:0063:0000:0000:FEFB')).to.equal(true);
            });
            it('invalid', () => {
                expect(validateIPv6('255.255.255.256')).to.equal(false);
            });
        });
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
                    expect(validateISBN(isbn)).to.equal(true);
                });
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
                    expect(validateISBN(isbn)).to.equal(false);
                });
            });
        });
        describe('IsDate', () => {
            it('positive', () => {
                expect(validateIsDate(new Date())).to.equal(true);
            });
            it('negative', () => {
                expect(validateIsDate(Date.now())).to.equal(false);
                expect(validateIsDate('Mon Sep 24 2018')).to.equal(false);
            });

        });
        describe('IsDefined', () => {
            it('valid', () => {
                expect(validateIsDefined(new Date())).to.equal(true);
                expect(validateIsDefined(null)).to.equal(true);
            });
            it('invalid', () => {
                expect(validateIsDefined(undefined)).to.equal(false);
            });
        });
        describe('IsNumber', () => {
            it('positive', () => {
                expect(validateIsNumber(12)).to.equal(true);
                expect(validateIsNumber(12.2)).to.equal(true);
                expect(validateIsNumber(12e3)).to.equal(true);
                expect(validateIsNumber(-12e3)).to.equal(true);
                expect(validateIsNumber(-0)).to.equal(true);
                expect(validateIsNumber(+0)).to.equal(true);
                expect(validateIsNumber(new Number(30))).to.equal(true);
            });
            it('negative', () => {
                expect(validateIsNumber(null)).to.equal(false);
                expect(validateIsNumber('123')).to.equal(false);
            });

        });
        describe('IsString', () => {
            it('positive', () => {
                expect(validateIsString('')).to.equal(true);
                expect(validateIsString('me')).to.equal(true);
                expect(validateIsString('12e3')).to.equal(true);
                expect(validateIsString(new String(134))).to.equal(true);
            });
            it('negative', () => {
                expect(validateIsString(null)).to.equal(false);
                expect(validateIsString(123)).to.equal(false);
            });

        });
        describe('Length', () => {
            it('positive', () => {
                expect(validateLength('test', 4, 4)).to.equal(true);
                expect(validateLength('test hallo', 4, 10)).to.equal(true);
            });
            it('negative', () => {
                expect(validateLength('test hallo', -4, 10)).to.equal(false);
                expect(validateLength('test hallo', 10, 4)).to.equal(false);
                expect(validateLength('d', 2, 4)).to.equal(false);
                expect(validateLength('12345', 2, 4)).to.equal(false);
            });

        });
        describe('Max', () => {
            it('positive', () => {
                expect(validateNumberMax(12, 12)).to.equal(true);
                expect(validateNumberMax(0, 12)).to.equal(true);
                expect(validateNumberMax(-12, 12)).to.equal(true);
                expect(validateNumberMax(-24, -12)).to.equal(true);
                expect(validateNumberMax(-0, +0)).to.equal(true);
                const currentMillis = Date.now();
                const constantDate = new Date(currentMillis);
                const olderDate = new Date(currentMillis + 20);
                expect(validateDateMax(constantDate, constantDate)).to.equal(true);
                expect(validateDateMax(constantDate, olderDate)).to.equal(true);

            });
            it('negative', () => {
                const currentMillis = Date.now();
                const constantDate = new Date(currentMillis);
                const youngerDate = new Date(currentMillis - 1000);
                expect(validateNumberMax(24, -12)).to.equal(false);
                expect(validateNumberMax(-12, -24)).to.equal(false);
                expect(validateDateMax(constantDate, youngerDate)).to.equal(false);
            });

        });
        describe('Min', () => {
            it('positive', () => {
                expect(validateNumberMin(12, 12)).to.equal(true);
                expect(validateNumberMin(12, 0)).to.equal(true);
                expect(validateNumberMin(12, -12)).to.equal(true);
                expect(validateNumberMin(24, 12)).to.equal(true);
                expect(validateNumberMin(-0, +0)).to.equal(true);
                const currentMillis = Date.now();
                const constantDate = new Date(currentMillis);
                const olderDate = new Date(currentMillis + 20);
                expect(validateDateMin(constantDate, constantDate)).to.equal(true);
                expect(validateDateMin(olderDate, constantDate)).to.equal(true);

            });
            it('negative', () => {
                const currentMillis = Date.now();
                const constantDate = new Date(currentMillis);
                const youngerDate = new Date(currentMillis - 1000);
                expect(validateNumberMin(-24, 12)).to.equal(false);
                expect(validateNumberMin(-24, -12)).to.equal(false);
                expect(validateDateMin(youngerDate, constantDate)).to.equal(false);

            });
        });
        describe('NotEmpty', () => {
            it('positive', () => {
                expect(validateNotEmpty('d', false)).to.equal(true);
                expect(validateNotEmpty(' ', false)).to.equal(true);
                expect(validateNotEmpty([' '], false)).to.equal(true);
                const set: Set<string> = new Set();
                set.add('first element');
                expect(validateNotEmpty(['text', 3, [1], set], true)).to.equal(true);

            });
            it('negative', () => {
                expect(validateNotEmpty([''], false)).to.equal(false);
                expect(validateNotEmpty('', false)).to.equal(false);
                expect(validateNotEmpty([], false)).to.equal(false);
                expect(validateNotEmpty([12, ''], true)).to.equal(false);
                expect(validateNotEmpty(['text', 3, [], 1], true)).to.equal(false);
                const set: Set<string> = new Set();
                expect(validateNotEmpty(['text', 3, [1], set], true)).to.equal(false);

            });

        });


        describe('NotNull', () => {
            it('positive', () => {
                expect(validateNotNull('')).to.equal(true);
                expect(validateNotNull(undefined)).to.equal(true);


            });
            it('negative', () => {
                expect(validateNotNull(null)).to.equal(false);
            });

        });
        describe('Past', () => {
            it('is past', () => {
                expect(validatePast(new Date(Date.now() - 10000))).to.equal(true);
                expect(validatePast(new Date(Date.now() - (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).to.equal(true);
            });
            it('is future', () => {
                expect(validatePast(new Date(Date.now() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).to.equal(false);
            });
        });
        describe('Range', () => {
            it('positive', () => {
                const now = Date.now();
                const nowDate = new Date(now);
                const past = new Date(now - 20000);
                const future = new Date(now + 20000);
                expect(validateDateRange(nowDate, past, future)).to.equal(true);
                expect(validateDateRange(past, past, future)).to.equal(true);
                expect(validateDateRange(future, nowDate, future)).to.equal(true);
                expect(validateDateRange(nowDate, nowDate, nowDate)).to.equal(true);

                expect(validateNumberRange(0, -1, 1)).to.equal(true);
                expect(validateNumberRange(2, 0, 2)).to.equal(true);
                expect(validateNumberRange(0, 0, 2)).to.equal(true);
                expect(validateNumberRange(0, 0, 0)).to.equal(true);

            });
            it('negative', () => {
                const now = Date.now();
                const nowDate = new Date(now);
                const past = new Date(now - 20000);
                const future = new Date(now + 20000);

                expect(validateDateRange(nowDate, past, past)).to.equal(false);
                expect(validateDateRange(nowDate, future, future)).to.equal(false);
                expect(validateDateRange(nowDate, future, past)).to.equal(false);

                expect(validateNumberRange(0, -1, -2)).to.equal(false);
                expect(validateNumberRange(0, 1, 2)).to.equal(false);
                expect(validateNumberRange(0, 2, -1)).to.equal(false);
            });
        });
        describe('Required', () => {
            it('positive', () => {
                expect(validateRequired(() => {
                })).to.equal(true);
                expect(validateRequired(1)).to.equal(true);
                expect(validateRequired('')).to.equal(true);
                expect(validateRequired(new Date())).to.equal(true);


            });
            it('negative', () => {
                expect(validateRequired(null)).to.equal(false);
                expect(validateRequired(undefined)).to.equal(false);
            });
        });
    });
    const validateOnClass = new ValidateOnClass();
    describe('ValidateOnClass', () => {
        it('positive', () => {
            assert.doesNotThrow(() => validateOnClass.notNull(1));
            assert.doesNotThrow(() => validateOnClass.notNull(undefined));
            assert.doesNotThrow(() => validateOnClass.notEmpty('text'));
            assert.doesNotThrow(() => validateOnClass.notEmptyRequired(null));
            assert.doesNotThrow(() => validateOnClass.notEmptyRequired(undefined));
            assert.doesNotThrow(() => validateOnClass.isDefined(1));
            assert.doesNotThrow(() => validateOnClass.isDefined(null));
            assert.doesNotThrow(() => validateOnClass.isDate(new Date()));
            assert.doesNotThrow(() => validateOnClass.isNumber(1));
            assert.doesNotThrow(() => validateOnClass.isNumber(-1));
            assert.doesNotThrow(() => validateOnClass.isNumber(0));
            assert.doesNotThrow(() => validateOnClass.isNumber(1e5));
            assert.doesNotThrow(() => validateOnClass.isString('dfdds'));
            assert.doesNotThrow(() => validateOnClass.isString(new String(33)));
            assert.doesNotThrow(() => validateOnClass.maxNumber(2));
            assert.doesNotThrow(() => validateOnClass.maxNumber(-21));
            assert.doesNotThrow(() => validateOnClass.maxNumber(0));
            assert.doesNotThrow(() => validateOnClass.minNumber(2));
            assert.doesNotThrow(() => validateOnClass.minNumber(21));
            assert.doesNotThrow(() => validateOnClass.minNumber(0));
            assert.doesNotThrow(() => validateOnClass.maxDate(pastDate));
            assert.doesNotThrow(() => validateOnClass.maxDate(nowDate));
            assert.doesNotThrow(() => validateOnClass.maxDate(futureDate));
            assert.doesNotThrow(() => validateOnClass.minDate(futureDate));
            assert.doesNotThrow(() => validateOnClass.minDate(pastDate));
            assert.doesNotThrow(() => validateOnClass.minDate(nowDate));
            assert.doesNotThrow(() => validateOnClass.past(nowDate));
            assert.doesNotThrow(() => validateOnClass.past(pastDate));
            assert.doesNotThrow(() => validateOnClass.future(new Date(Date.now() + 1000 * 60)));
            assert.doesNotThrow(() => validateOnClass.rangeNumber(-1));
            assert.doesNotThrow(() => validateOnClass.rangeNumber(0));
            assert.doesNotThrow(() => validateOnClass.rangeNumber(1));
            assert.doesNotThrow(() => validateOnClass.rangeNumber(0.9));
            assert.doesNotThrow(() => validateOnClass.rangeDate(futureDate));
            assert.doesNotThrow(() => validateOnClass.rangeDate(pastDate));
            assert.doesNotThrow(() => validateOnClass.rangeDate(nowDate));
            assert.doesNotThrow(() => validateOnClass.required(nowDate));
            assert.doesNotThrow(() => validateOnClass.required({}));
            assert.doesNotThrow(() => validateOnClass.required([]));
        });
        it('negative', () => {
            assert.throws(() => {
                validateOnClass.notNull(null);

                console.log('???');
            });
            assert.throws(() => validateOnClass.notEmpty(['']));
            assert.throws(() => validateOnClass.notEmpty(''));
            assert.throws(() => validateOnClass.notEmptyRequired([null]));
            assert.throws(() => validateOnClass.notEmptyRequired([undefined]));
            assert.throws(() => validateOnClass.isDefined(undefined));
            assert.throws(() => validateOnClass.isDate(undefined));
            assert.throws(() => validateOnClass.isDate(null));
            assert.throws(() => validateOnClass.isNumber(null));
            assert.throws(() => validateOnClass.isNumber(undefined));
            assert.throws(() => validateOnClass.isNumber([]));
            assert.throws(() => validateOnClass.isNumber(new Date()));
            assert.throws(() => validateOnClass.isString(undefined));
            assert.throws(() => validateOnClass.isString(null));
            assert.throws(() => validateOnClass.isString(2));
            assert.throws(() => validateOnClass.isString(new Date()));
            assert.throws(() => validateOnClass.maxNumber(3));
            assert.throws(() => validateOnClass.maxNumber(1e3));
            assert.throws(() => validateOnClass.maxNumber(null));
            assert.throws(() => validateOnClass.maxNumber(undefined));
            assert.throws(() => validateOnClass.minNumber(-3));
            assert.throws(() => validateOnClass.minNumber(-1e-2));
            assert.throws(() => validateOnClass.minNumber(null));
            assert.throws(() => validateOnClass.minNumber(undefined));
            assert.throws(() => validateOnClass.maxDate(new Date(now + 1001)));
            assert.throws(() => validateOnClass.maxDate(undefined));
            assert.throws(() => validateOnClass.maxDate(null));
            assert.throws(() => validateOnClass.minDate(new Date(now - 1001)));
            assert.throws(() => validateOnClass.minDate(undefined));
            assert.throws(() => validateOnClass.minDate(null));
            assert.throws(() => validateOnClass.past(null));
            assert.throws(() => validateOnClass.past(undefined));
            assert.throws(() => validateOnClass.past(new Date(Date.now() + 1000 * 60)));
            assert.throws(() => validateOnClass.future(null));
            assert.throws(() => validateOnClass.future(undefined));
            assert.throws(() => validateOnClass.future(new Date()));
            assert.throws(() => validateOnClass.rangeNumber(-1.01));
            assert.throws(() => validateOnClass.rangeNumber(1.01));
            assert.throws(() => validateOnClass.rangeNumber(undefined));
            assert.throws(() => validateOnClass.rangeNumber(null));
            assert.throws(() => validateOnClass.rangeDate(null));
            assert.throws(() => validateOnClass.rangeDate(undefined));
            assert.throws(() => validateOnClass.rangeDate(new Date(now + 1001)));
            assert.throws(() => validateOnClass.required(null));
            assert.throws(() => validateOnClass.required(undefined));
        });
    });
    const validateOnMethod = new ValidateOnMethod();
    describe('ValidateOnMethod', () => {
        it('positive', () => {
            assert.doesNotThrow(() => validateOnMethod.validate(1));
            assert.doesNotThrow(() => validateOnMethod.noValidate(null));
            assert.doesNotThrow(() => validateOnMethod.noValidate(undefined));
        });
        it('negative', () => {
            assert.throws(() => validateOnMethod.validate(null));
        });
    });

});


