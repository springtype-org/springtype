
// import {
//   validateCreditCard,
//   validateDateMax,
//   validateDateMin,
//   validateDateRange,
//   validateEmail,
//   validateFuture,
//   validateIBAN,
//   validateIPv4,
//   validateIPv6,
//   validateISBN,
//   validateIsDate,
//   validateIsDefined,
//   validateIsNumber,
//   validateIsString,
//   validateLength,
//   validateNotEmpty,
//   validateNotNull,
//   validateNumberMax,
//   validateNumberMin,
//   validateNumberRange,
//   validatePast,
//   validateRequired
// } from "../index";

// import { futureDate, now, nowDate, pastDate, ValidateOnClass, ValidateOnMethod } from "./helper/validate-me";

// describe('validate', () => {
//   describe('decorators', () => {
//     describe('CreditCard', () => {
//       it('valid', () => {
//         expect(validateCreditCard('49927398716')).toEqual(true);
//         expect(validateCreditCard('4485297637724400')).toEqual(true);
//         expect(validateCreditCard('4485727825149861')).toEqual(true);
//         expect(validateCreditCard('4929847923249092')).toEqual(true);
//         expect(validateCreditCard('4024007185078382')).toEqual(true);
//         expect(validateCreditCard('4024007149721325')).toEqual(true);
//         expect(validateCreditCard('5161006306455396')).toEqual(true);
//         expect(validateCreditCard('5252831751664014')).toEqual(true);
//         expect(validateCreditCard('5109346796537161')).toEqual(true);
//         expect(validateCreditCard('5391037036267084')).toEqual(true);
//         expect(validateCreditCard('5138349638623392')).toEqual(true);
//         expect(validateCreditCard('6011227287427713')).toEqual(true);
//         expect(validateCreditCard('6011004888550312')).toEqual(true);
//         expect(validateCreditCard('6011629938837598')).toEqual(true);
//         expect(validateCreditCard('6011657675059423')).toEqual(true);
//         expect(validateCreditCard('6011648593100068')).toEqual(true);
//         expect(validateCreditCard('348601050374293')).toEqual(true);
//         expect(validateCreditCard('374783347619412')).toEqual(true);
//         expect(validateCreditCard('340534805505168')).toEqual(true);
//         expect(validateCreditCard('371993993100368')).toEqual(true);
//         expect(validateCreditCard('371523710389968')).toEqual(true);
//         expect(validateCreditCard('123456789007')).toEqual(true);
//         expect(validateCreditCard('123456789015')).toEqual(true);
//         expect(validateCreditCard('123456789023')).toEqual(true);
//         expect(validateCreditCard('123456789031')).toEqual(true);
//         expect(validateCreditCard('123456789049')).toEqual(true);
//         expect(validateCreditCard('123456789056')).toEqual(true);
//         expect(validateCreditCard('123456789064')).toEqual(true);
//         expect(validateCreditCard('123456789072')).toEqual(true);
//         expect(validateCreditCard('123456789080')).toEqual(true);
//         expect(validateCreditCard('123456789098')).toEqual(true);
//         expect(validateCreditCard('123456789106')).toEqual(true);
//         expect(validateCreditCard('123456789114')).toEqual(true);
//         expect(validateCreditCard('123456789122')).toEqual(true);
//         expect(validateCreditCard('123456789130')).toEqual(true);
//         expect(validateCreditCard('123456789148')).toEqual(true);
//         expect(validateCreditCard('123456789155')).toEqual(true);
//         expect(validateCreditCard('123456789163')).toEqual(true);
//         expect(validateCreditCard('123456789171')).toEqual(true);
//         expect(validateCreditCard('123456789189')).toEqual(true);
//         expect(validateCreditCard('123456789197')).toEqual(true);
//         expect(validateCreditCard('123456789205')).toEqual(true);
//         expect(validateCreditCard('123456789213')).toEqual(true);
//         expect(validateCreditCard('123456789221')).toEqual(true);
//         expect(validateCreditCard('123456789239')).toEqual(true);
//         expect(validateCreditCard('123456789247')).toEqual(true);
//         expect(validateCreditCard('123456789254')).toEqual(true);
//         expect(validateCreditCard('123456789262')).toEqual(true);
//         expect(validateCreditCard('123456789270')).toEqual(true);
//         expect(validateCreditCard('123456789288')).toEqual(true);
//         expect(validateCreditCard('123456789296')).toEqual(true);
//         expect(validateCreditCard('123456789304')).toEqual(true);
//         expect(validateCreditCard('123456789312')).toEqual(true);
//         expect(validateCreditCard('123456789320')).toEqual(true);
//         expect(validateCreditCard('123456789338')).toEqual(true);
//         expect(validateCreditCard('123456789346')).toEqual(true);
//         expect(validateCreditCard('123456789353')).toEqual(true);
//         expect(validateCreditCard('123456789361')).toEqual(true);
//         expect(validateCreditCard('123456789379')).toEqual(true);
//         expect(validateCreditCard('123456789387')).toEqual(true);
//         expect(validateCreditCard('123456789395')).toEqual(true);
//         expect(validateCreditCard('123456789403')).toEqual(true);
//         expect(validateCreditCard('123456789411')).toEqual(true);
//         expect(validateCreditCard('123456789429')).toEqual(true);
//         expect(validateCreditCard('123456789437')).toEqual(true);
//         expect(validateCreditCard('123456789445')).toEqual(true);
//         expect(validateCreditCard('123456789452')).toEqual(true);
//         expect(validateCreditCard('123456789460')).toEqual(true);
//         expect(validateCreditCard('123456789478')).toEqual(true);
//         expect(validateCreditCard('123456789486')).toEqual(true);
//         expect(validateCreditCard('123456789494')).toEqual(true);
//         expect(validateCreditCard('123456789502')).toEqual(true);
//         expect(validateCreditCard('123456789510')).toEqual(true);
//         expect(validateCreditCard('123456789528')).toEqual(true);
//         expect(validateCreditCard('123456789536')).toEqual(true);
//         expect(validateCreditCard('123456789544')).toEqual(true);
//         expect(validateCreditCard('123456789551')).toEqual(true);
//         expect(validateCreditCard('123456789569')).toEqual(true);
//         expect(validateCreditCard('123456789577')).toEqual(true);
//         expect(validateCreditCard('123456789585')).toEqual(true);
//         expect(validateCreditCard('123456789593')).toEqual(true);
//         expect(validateCreditCard('123456789601')).toEqual(true);
//         expect(validateCreditCard('123456789619')).toEqual(true);
//         expect(validateCreditCard('123456789627')).toEqual(true);
//         expect(validateCreditCard('123456789635')).toEqual(true);
//         expect(validateCreditCard('123456789643')).toEqual(true);
//         expect(validateCreditCard('123456789650')).toEqual(true);
//         expect(validateCreditCard('123456789668')).toEqual(true);
//         expect(validateCreditCard('123456789676')).toEqual(true);
//         expect(validateCreditCard('123456789684')).toEqual(true);
//         expect(validateCreditCard('123456789692')).toEqual(true);
//         expect(validateCreditCard('123456789700')).toEqual(true);
//         expect(validateCreditCard('123456789718')).toEqual(true);
//         expect(validateCreditCard('123456789726')).toEqual(true);
//         expect(validateCreditCard('123456789734')).toEqual(true);
//         expect(validateCreditCard('123456789742')).toEqual(true);
//         expect(validateCreditCard('123456789759')).toEqual(true);
//         expect(validateCreditCard('123456789767')).toEqual(true);
//         expect(validateCreditCard('123456789775')).toEqual(true);
//         expect(validateCreditCard('123456789783')).toEqual(true);
//         expect(validateCreditCard('123456789791')).toEqual(true);
//         expect(validateCreditCard('123456789809')).toEqual(true);
//         expect(validateCreditCard('123456789817')).toEqual(true);
//         expect(validateCreditCard('123456789825')).toEqual(true);
//         expect(validateCreditCard('123456789833')).toEqual(true);
//         expect(validateCreditCard('123456789841')).toEqual(true);
//         expect(validateCreditCard('123456789858')).toEqual(true);
//         expect(validateCreditCard('123456789866')).toEqual(true);
//         expect(validateCreditCard('123456789874')).toEqual(true);
//         expect(validateCreditCard('123456789882')).toEqual(true);
//         expect(validateCreditCard('123456789890')).toEqual(true);
//         expect(validateCreditCard('123456789908')).toEqual(true);
//         expect(validateCreditCard('123456789916')).toEqual(true);
//         expect(validateCreditCard('123456789924')).toEqual(true);
//         expect(validateCreditCard('123456789932')).toEqual(true);
//         expect(validateCreditCard('123456789940')).toEqual(true);
//         expect(validateCreditCard('123456789957')).toEqual(true);
//         expect(validateCreditCard('123456789965')).toEqual(true);
//         expect(validateCreditCard('123456789973')).toEqual(true);
//         expect(validateCreditCard('123456789981')).toEqual(true);
//         expect(validateCreditCard('123456789999')).toEqual(true);
//         expect(validateCreditCard('4111111111111111')).toEqual(true);
//         expect(validateCreditCard('4111-1111-1111-1111')).toEqual(true);
//       });
//       it('invalid', () => {
//         expect(validateCreditCard('1445-5789-981')).toEqual(false);
//       });
//     });
//     describe('Email', () => {
//       it('valid', () => {
//         expect(validateEmail('support@springtype.org')).toEqual(true);
//         expect(validateEmail('m.mansi1@springtype.org')).toEqual(true);
//         expect(validateEmail('me@opx.org.io')).toEqual(true);
//       });
//       it('invalid', () => {
//         expect(validateEmail('')).toEqual(false);
//         expect(validateEmail('name_part@domain_part')).toEqual(false);
//         expect(validateEmail('name@1@example.com')).toEqual(false);
//         expect(validateEmail('nfoo@bar@machine')).toEqual(false);
//         expect(validateEmail('nf\\oo@bar@machine')).toEqual(false);
//       });
//     });
//     describe('Future', () => {
//       it('is past', () => {
//         expect(validateFuture(new Date())).toEqual(false);
//         expect(validateFuture(new Date(Date.now() - (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).toEqual(false);
//       });
//       it('is future', () => {
//         expect(validateFuture(new Date(Date.now() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).toEqual(true);
//       });
//     });
//     describe('IBAN', () => {
//       it('valid', () => {
//         expect(validateIBAN('DE89 3704 0044 0532 0130 00')).toEqual(true);
//         expect(validateIBAN('DE89-3704-0044-0532-0130-00')).toEqual(true);
//         expect(validateIBAN('DE89/3704/0044/0532/0130/00')).toEqual(true);
//         expect(validateIBAN('AT483200000012345864')).toEqual(true);
//         expect(validateIBAN('BE71096123456769')).toEqual(true);
//         expect(validateIBAN('BG18RZBB91550123456789')).toEqual(true);
//         expect(validateIBAN('HR1723600001101234565')).toEqual(true);
//         expect(validateIBAN('CY21002001950000357001234567')).toEqual(true);
//         expect(validateIBAN('CZ5508000000001234567899')).toEqual(true);
//         expect(validateIBAN('FO9264600123456789')).toEqual(true);
//         expect(validateIBAN('GL8964710123456789')).toEqual(true);
//         expect(validateIBAN('DK9520000123456789')).toEqual(true);
//         expect(validateIBAN('EE471000001020145685')).toEqual(true);
//         expect(validateIBAN('FI1410093000123458')).toEqual(true);
//         expect(validateIBAN('FR7630006000011234567890189')).toEqual(true);
//         expect(validateIBAN('DE91100000000123456789')).toEqual(true);
//         expect(validateIBAN('GI04BARC000001234567890')).toEqual(true);
//         expect(validateIBAN('GR9608100010000001234567890')).toEqual(true);
//         expect(validateIBAN('HU93116000060000000012345676')).toEqual(true);
//         expect(validateIBAN('IS030001121234561234567890')).toEqual(true);
//         expect(validateIBAN('IE64IRCE92050112345678')).toEqual(true);
//         expect(validateIBAN('IT60X0542811101000000123456')).toEqual(true);
//         expect(validateIBAN('LV97HABA0012345678910')).toEqual(true);
//         expect(validateIBAN('LI7408806123456789012')).toEqual(true);
//         expect(validateIBAN('LT601010012345678901')).toEqual(true);
//         expect(validateIBAN('LU120010001234567891')).toEqual(true);
//         expect(validateIBAN('MT31MALT01100000000000000000123')).toEqual(true);
//         expect(validateIBAN('MC5810096180790123456789085')).toEqual(true);
//         expect(validateIBAN('NL02ABNA0123456789')).toEqual(true);
//         expect(validateIBAN('NO8330001234567')).toEqual(true);
//         expect(validateIBAN('PL10105000997603123456789123')).toEqual(true);
//         expect(validateIBAN('PT50002700000001234567833')).toEqual(true);
//         expect(validateIBAN('RO09BCYP0000001234567890')).toEqual(true);
//         expect(validateIBAN('SM76P0854009812123456789123')).toEqual(true);
//         expect(validateIBAN('SK8975000000000012345671')).toEqual(true);
//         expect(validateIBAN('SI56192001234567892')).toEqual(true);
//         expect(validateIBAN('ES7921000813610123456789')).toEqual(true);
//         expect(validateIBAN('SE7280000810340009783242')).toEqual(true);
//         expect(validateIBAN('CH5604835012345678009')).toEqual(true);
//         expect(validateIBAN('GB98MIDL07009312345678')).toEqual(true);
//       });
//       it('invalid', () => {
//         expect(validateIBAN('AL35202111090000000001234567')).toEqual(false);
//         expect(validateIBAN('TG53TG0090604310346500400070')).toEqual(false);
//         expect(validateIBAN('DZ580002100001113000000570')).toEqual(false);
//         expect(validateIBAN('AO06004400006729503010102')).toEqual(false);
//         expect(validateIBAN('BJ66BJ0610100100144390000769')).toEqual(false);
//         expect(validateIBAN('BF42BF0840101300463574000390')).toEqual(false);
//         expect(validateIBAN('BI43201011067444')).toEqual(false);
//         expect(validateIBAN('CM2110002000300277976315008')).toEqual(false);
//         expect(validateIBAN('CV64000500000020108215144')).toEqual(false);
//         expect(validateIBAN('CF4220001000010120069700160')).toEqual(false);
//         expect(validateIBAN('TD8960002000010271091600153')).toEqual(false);
//         expect(validateIBAN('KM4600005000010010904400137')).toEqual(false);
//         expect(validateIBAN('CG3930011000101013451300019')).toEqual(false);
//         expect(validateIBAN('DJ2110002010010409943020008')).toEqual(false);
//         expect(validateIBAN('EG2100037000671002392189379')).toEqual(false);
//         expect(validateIBAN('GQ7050002001003715228190196')).toEqual(false);
//         expect(validateIBAN('GA2140021010032001890020126')).toEqual(false);
//         expect(validateIBAN('GW04GW1430010181800637601')).toEqual(false);
//         expect(validateIBAN('HN54PISA00000000000000123124')).toEqual(false);
//         expect(validateIBAN('IR710570029971601460641001')).toEqual(false);
//         expect(validateIBAN('CI93CI0080111301134291200589')).toEqual(false);
//         expect(validateIBAN('MG4600005030071289421016045')).toEqual(false);
//         expect(validateIBAN('ML13ML0160120102600100668497')).toEqual(false);
//         expect(validateIBAN('MA64011519000001205000534921')).toEqual(false);
//         expect(validateIBAN('MZ59000301080016367102371')).toEqual(false);
//         expect(validateIBAN('NI92BAMC000000000000000003123123')).toEqual(false);
//         expect(validateIBAN('NE58NE0380100100130305000268')).toEqual(false);
//         expect(validateIBAN('SN08SN0100152000048500003035')).toEqual(false);
//         expect(validateIBAN('TG53TG0090604310346500400070')).toEqual(false);
//       });
//     });
//     describe('IPv4', () => {
//       it('valid', () => {
//         expect(validateIPv4('0.0.0.0')).toEqual(true);
//         expect(validateIPv4('10.0.0.0')).toEqual(true);
//         expect(validateIPv4('100.64.0.0')).toEqual(true);
//         expect(validateIPv4('127.0.0.0')).toEqual(true);
//         expect(validateIPv4('169.254.0.0')).toEqual(true);
//         expect(validateIPv4('172.16.0.0')).toEqual(true);
//         expect(validateIPv4('192.0.0.0')).toEqual(true);
//         expect(validateIPv4('192.0.0.0')).toEqual(true);
//         expect(validateIPv4('192.0.2.0')).toEqual(true);
//         expect(validateIPv4('192.88.99.0')).toEqual(true);
//         expect(validateIPv4('192.168.0.0')).toEqual(true);
//         expect(validateIPv4('198.18.0.0')).toEqual(true);
//         expect(validateIPv4('198.51.100.0')).toEqual(true);
//         expect(validateIPv4('203.0.113.0')).toEqual(true);
//         expect(validateIPv4('224.0.0.0')).toEqual(true);
//         expect(validateIPv4('240.0.0.0')).toEqual(true);
//         expect(validateIPv4('255.255.255.255')).toEqual(true);
//       });
//       it('invalid', () => {
//         expect(validateIPv4('255.255.255.256')).toEqual(false);
//         expect(validateIPv4('255.255.256.255')).toEqual(false);
//         expect(validateIPv4('255.256.255.255')).toEqual(false);
//         expect(validateIPv4('256.255.255.255')).toEqual(false);
//         expect(validateIPv4('255.255.255.255.255')).toEqual(false);
//         expect(validateIPv4('127.0.0.0.0')).toEqual(false);

//       });
//     });
//     describe('IPv6', () => {
//       it('valid', () => {

//         expect(validateIPv6('2001:cdba:0000:0000:0000:0000:3257:9652')).toEqual(true);
//         expect(validateIPv6('2001:cdba:0:0:0:0:3257:9652')).toEqual(true);
//         expect(validateIPv6('2001:cdba::3257:9652')).toEqual(true);
//         expect(validateIPv6('2001:0000:3238:DFE1:0063:0000:0000:FEFB')).toEqual(true);
//       });
//       it('invalid', () => {
//         expect(validateIPv6('255.255.255.256')).toEqual(false);
//       });
//     });
//     describe('ISBN', () => {
//       it('valid', () => {
//         const validISBN = [
//           //Without prefix:
//           '048665088X',
//           '0306406152',
//           '9788371815102',
//           //With prefix:
//           'ISBN 048665088X',
//           'ISBN: 048665088X',
//           'ISBN-10 048665088X',
//           'ISBN-13 048665088X',
//           'ISBN-10: 048665088X',
//           'ISBN-13: 048665088X',
//           'isbn 048665088X',
//           'isbn: 048665088X',
//           'isbn-10 048665088X',
//           'isbn-13 048665088X',
//           'isbn-10: 048665088X',
//           'isbn-13: 048665088X'
//         ];
//         validISBN.forEach(isbn => {
//           expect(validateISBN(isbn)).toEqual(true);
//         });
//       });
//       it('invalid', () => {
//         const invalidISBN = [
//           //Without prefix:
//           '048665088A',    //invalid letter 'A'
//           '03064061521',   //too many digits (11)
//           '030640615',     //not enought digits (9)
//           //With prefix:
//           'ISBN048665088X',     //after 'ISBN' hav to been ':' or space
//           'ISBN:048665088X',    //after ':' have to been space
//           'ISBN-10:048665088X', //after ':' have to been space
//           'ISBN-13:048665088X'  //after ':' have to been space
//         ];
//         invalidISBN.forEach(isbn => {
//           expect(validateISBN(isbn)).toEqual(false);
//         });
//       });
//     });
//     describe('IsDate', () => {
//       it('positive', () => {
//         expect(validateIsDate(new Date())).toEqual(true);
//       });
//       it('negative', () => {
//         expect(validateIsDate(Date.now())).toEqual(false);
//         expect(validateIsDate('Mon Sep 24 2018')).toEqual(false);
//       });

//     });
//     describe('IsDefined', () => {
//       it('valid', () => {
//         expect(validateIsDefined(new Date())).toEqual(true);
//         expect(validateIsDefined(null)).toEqual(true);
//       });
//       it('invalid', () => {
//         expect(validateIsDefined(undefined)).toEqual(false);
//       });
//     });
//     describe('IsNumber', () => {
//       it('positive', () => {
//         expect(validateIsNumber(12)).toEqual(true);
//         expect(validateIsNumber(12.2)).toEqual(true);
//         expect(validateIsNumber(12e3)).toEqual(true);
//         expect(validateIsNumber(-12e3)).toEqual(true);
//         expect(validateIsNumber(-0)).toEqual(true);
//         expect(validateIsNumber(+0)).toEqual(true);
//         expect(validateIsNumber(new Number(30))).toEqual(true);
//       });
//       it('negative', () => {
//         expect(validateIsNumber(null)).toEqual(false);
//         expect(validateIsNumber('123')).toEqual(false);
//       });

//     });
//     describe('IsString', () => {
//       it('positive', () => {
//         expect(validateIsString('')).toEqual(true);
//         expect(validateIsString('me')).toEqual(true);
//         expect(validateIsString('12e3')).toEqual(true);
//         expect(validateIsString(new String(134))).toEqual(true);
//       });
//       it('negative', () => {
//         expect(validateIsString(null)).toEqual(false);
//         expect(validateIsString(123)).toEqual(false);
//       });

//     });
//     describe('Length', () => {
//       it('positive', () => {
//         expect(validateLength('test', 4, 4)).toEqual(true);
//         expect(validateLength('test hallo', 4, 10)).toEqual(true);
//       });
//       it('negative', () => {
//         expect(validateLength('test hallo', -4, 10)).toEqual(false);
//         expect(validateLength('test hallo', 10, 4)).toEqual(false);
//         expect(validateLength('d', 2, 4)).toEqual(false);
//         expect(validateLength('12345', 2, 4)).toEqual(false);
//       });

//     });
//     describe('Max', () => {
//       it('positive', () => {
//         expect(validateNumberMax(12, 12)).toEqual(true);
//         expect(validateNumberMax(0, 12)).toEqual(true);
//         expect(validateNumberMax(-12, 12)).toEqual(true);
//         expect(validateNumberMax(-24, -12)).toEqual(true);
//         expect(validateNumberMax(-0, +0)).toEqual(true);
//         const currentMillis = Date.now();
//         const constantDate = new Date(currentMillis);
//         const olderDate = new Date(currentMillis + 20);
//         expect(validateDateMax(constantDate, constantDate)).toEqual(true);
//         expect(validateDateMax(constantDate, olderDate)).toEqual(true);

//       });
//       it('negative', () => {
//         const currentMillis = Date.now();
//         const constantDate = new Date(currentMillis);
//         const youngerDate = new Date(currentMillis - 1000);
//         expect(validateNumberMax(24, -12)).toEqual(false);
//         expect(validateNumberMax(-12, -24)).toEqual(false);
//         expect(validateDateMax(constantDate, youngerDate)).toEqual(false);
//       });

//     });
//     describe('Min', () => {
//       it('positive', () => {
//         expect(validateNumberMin(12, 12)).toEqual(true);
//         expect(validateNumberMin(12, 0)).toEqual(true);
//         expect(validateNumberMin(12, -12)).toEqual(true);
//         expect(validateNumberMin(24, 12)).toEqual(true);
//         expect(validateNumberMin(-0, +0)).toEqual(true);
//         const currentMillis = Date.now();
//         const constantDate = new Date(currentMillis);
//         const olderDate = new Date(currentMillis + 20);
//         expect(validateDateMin(constantDate, constantDate)).toEqual(true);
//         expect(validateDateMin(olderDate, constantDate)).toEqual(true);

//       });
//       it('negative', () => {
//         const currentMillis = Date.now();
//         const constantDate = new Date(currentMillis);
//         const youngerDate = new Date(currentMillis - 1000);
//         expect(validateNumberMin(-24, 12)).toEqual(false);
//         expect(validateNumberMin(-24, -12)).toEqual(false);
//         expect(validateDateMin(youngerDate, constantDate)).toEqual(false);

//       });
//     });
//     describe('NotEmpty', () => {
//       it('positive', () => {
//         expect(validateNotEmpty('d', false)).toEqual(true);
//         expect(validateNotEmpty(' ', false)).toEqual(true);
//         expect(validateNotEmpty([' '], false)).toEqual(true);
//         const set: Set<string> = new Set();
//         set.add('first element');
//         expect(validateNotEmpty(['text', 3, [1], set], true)).toEqual(true);

//       });
//       it('negative', () => {
//         expect(validateNotEmpty([''], false)).toEqual(false);
//         expect(validateNotEmpty('', false)).toEqual(false);
//         expect(validateNotEmpty([], false)).toEqual(false);
//         expect(validateNotEmpty([12, ''], true)).toEqual(false);
//         expect(validateNotEmpty(['text', 3, [], 1], true)).toEqual(false);
//         const set: Set<string> = new Set();
//         expect(validateNotEmpty(['text', 3, [1], set], true)).toEqual(false);

//       });

//     });


//     describe('NotNull', () => {
//       it('positive', () => {
//         expect(validateNotNull('')).toEqual(true);
//         expect(validateNotNull(undefined)).toEqual(true);


//       });
//       it('negative', () => {
//         expect(validateNotNull(null)).toEqual(false);
//       });

//     });
//     describe('Past', () => {
//       it('is past', () => {
//         expect(validatePast(new Date(Date.now() - 10000))).toEqual(true);
//         expect(validatePast(new Date(Date.now() - (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).toEqual(true);
//       });
//       it('is future', () => {
//         expect(validatePast(new Date(Date.now() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10)))).toEqual(false);
//       });
//     });
//     describe('Range', () => {
//       it('positive', () => {
//         const now = Date.now();
//         const nowDate = new Date(now);
//         const past = new Date(now - 20000);
//         const future = new Date(now + 20000);
//         expect(validateDateRange(nowDate, past, future)).toEqual(true);
//         expect(validateDateRange(past, past, future)).toEqual(true);
//         expect(validateDateRange(future, nowDate, future)).toEqual(true);
//         expect(validateDateRange(nowDate, nowDate, nowDate)).toEqual(true);

//         expect(validateNumberRange(0, -1, 1)).toEqual(true);
//         expect(validateNumberRange(2, 0, 2)).toEqual(true);
//         expect(validateNumberRange(0, 0, 2)).toEqual(true);
//         expect(validateNumberRange(0, 0, 0)).toEqual(true);

//       });
//       it('negative', () => {
//         const now = Date.now();
//         const nowDate = new Date(now);
//         const past = new Date(now - 20000);
//         const future = new Date(now + 20000);

//         expect(validateDateRange(nowDate, past, past)).toEqual(false);
//         expect(validateDateRange(nowDate, future, future)).toEqual(false);
//         expect(validateDateRange(nowDate, future, past)).toEqual(false);

//         expect(validateNumberRange(0, -1, -2)).toEqual(false);
//         expect(validateNumberRange(0, 1, 2)).toEqual(false);
//         expect(validateNumberRange(0, 2, -1)).toEqual(false);
//       });
//     });
//     describe('Required', () => {
//       it('positive', () => {
//         expect(validateRequired(() => {
//         })).toEqual(true);
//         expect(validateRequired(1)).toEqual(true);
//         expect(validateRequired('')).toEqual(true);
//         expect(validateRequired(new Date())).toEqual(true);


//       });
//       it('negative', () => {
//         expect(validateRequired(null)).toEqual(false);
//         expect(validateRequired(undefined)).toEqual(false);
//       });
//     });
//   });
//   const validateOnClass = new ValidateOnClass();
//   describe('ValidateOnClass', () => {
//     it('positive', () => {

//       expect((() => validateOnClass.notNull(1))).not.toThrow();
//       expect((() => validateOnClass.notNull(undefined))).not.toThrow();
//       expect((() => validateOnClass.notEmpty('text'))).not.toThrow();
//       expect((() => validateOnClass.notEmptyRequired(null))).not.toThrow();
//       expect((() => validateOnClass.notEmptyRequired(undefined))).not.toThrow();
//       expect((() => validateOnClass.isDefined(1))).not.toThrow();
//       expect((() => validateOnClass.isDefined(null))).not.toThrow();
//       expect((() => validateOnClass.isDate(new Date()))).not.toThrow();
//       expect((() => validateOnClass.isNumber(1))).not.toThrow();
//       expect((() => validateOnClass.isNumber(-1))).not.toThrow();
//       expect((() => validateOnClass.isNumber(0))).not.toThrow();
//       expect((() => validateOnClass.isNumber(1e5))).not.toThrow();
//       expect((() => validateOnClass.isString('dfdds'))).not.toThrow();
//       expect((() => validateOnClass.isString(new String(33)))).not.toThrow();
//       expect((() => validateOnClass.maxNumber(2))).not.toThrow();
//       expect((() => validateOnClass.maxNumber(-21))).not.toThrow();
//       expect((() => validateOnClass.maxNumber(0))).not.toThrow();
//       expect((() => validateOnClass.minNumber(2))).not.toThrow();
//       expect((() => validateOnClass.minNumber(21))).not.toThrow();
//       expect((() => validateOnClass.minNumber(0))).not.toThrow();
//       expect((() => validateOnClass.maxDate(pastDate))).not.toThrow();
//       expect((() => validateOnClass.maxDate(nowDate))).not.toThrow();
//       expect((() => validateOnClass.maxDate(futureDate))).not.toThrow();
//       expect((() => validateOnClass.minDate(futureDate))).not.toThrow();
//       expect((() => validateOnClass.minDate(pastDate))).not.toThrow();
//       expect((() => validateOnClass.minDate(nowDate))).not.toThrow();
//       expect((() => validateOnClass.past(nowDate))).not.toThrow();
//       expect((() => validateOnClass.past(pastDate))).not.toThrow();
//       expect((() => validateOnClass.future(new Date(Date.now() + 1000 * 60)))).not.toThrow();
//       expect((() => validateOnClass.rangeNumber(-1))).not.toThrow();
//       expect((() => validateOnClass.rangeNumber(0))).not.toThrow();
//       expect((() => validateOnClass.rangeNumber(1))).not.toThrow();
//       expect((() => validateOnClass.rangeNumber(0.9))).not.toThrow();
//       expect((() => validateOnClass.rangeDate(futureDate))).not.toThrow();
//       expect((() => validateOnClass.rangeDate(pastDate))).not.toThrow();
//       expect((() => validateOnClass.rangeDate(nowDate))).not.toThrow();
//       expect((() => validateOnClass.required(nowDate))).not.toThrow();
//       expect((() => validateOnClass.required({}))).not.toThrow();
//       expect((() => validateOnClass.required([]))).not.toThrow();
//     });
//     it('negative', () => {
//       expect(() => {
//         validateOnClass.notNull(null);

//         console.log('???');
//       }).toThrow();
//       expect((() => validateOnClass.notEmpty(['']))).toThrow();
//       expect((() => validateOnClass.notEmpty(''))).toThrow();
//       expect((() => validateOnClass.notEmptyRequired([null]))).toThrow();
//       expect((() => validateOnClass.notEmptyRequired([undefined]))).toThrow();
//       expect((() => validateOnClass.isDefined(undefined))).toThrow();
//       expect((() => validateOnClass.isDate(undefined))).toThrow();
//       expect((() => validateOnClass.isDate(null))).toThrow();
//       expect((() => validateOnClass.isNumber(null))).toThrow();
//       expect((() => validateOnClass.isNumber(undefined))).toThrow();
//       expect((() => validateOnClass.isNumber([]))).toThrow();
//       expect((() => validateOnClass.isNumber(new Date()))).toThrow();
//       expect((() => validateOnClass.isString(undefined))).toThrow();
//       expect((() => validateOnClass.isString(null))).toThrow();
//       expect((() => validateOnClass.isString(2))).toThrow();
//       expect((() => validateOnClass.isString(new Date()))).toThrow();
//       expect((() => validateOnClass.maxNumber(3))).toThrow();
//       expect((() => validateOnClass.maxNumber(1e3))).toThrow();
//       expect((() => validateOnClass.maxNumber(null))).toThrow();
//       expect((() => validateOnClass.maxNumber(undefined))).toThrow();
//       expect((() => validateOnClass.minNumber(-3))).toThrow();
//       expect((() => validateOnClass.minNumber(-1e-2))).toThrow();
//       expect((() => validateOnClass.minNumber(null))).toThrow();
//       expect((() => validateOnClass.minNumber(undefined))).toThrow();
//       expect((() => validateOnClass.maxDate(new Date(now + 1001)))).toThrow();
//       expect((() => validateOnClass.maxDate(undefined))).toThrow();
//       expect((() => validateOnClass.maxDate(null))).toThrow();
//       expect((() => validateOnClass.minDate(new Date(now - 1001)))).toThrow();
//       expect((() => validateOnClass.minDate(undefined))).toThrow();
//       expect((() => validateOnClass.minDate(null))).toThrow();
//       expect((() => validateOnClass.past(null))).toThrow();
//       expect((() => validateOnClass.past(undefined))).toThrow();
//       expect((() => validateOnClass.past(new Date(Date.now() + 1000 * 60)))).toThrow();
//       expect((() => validateOnClass.future(null))).toThrow();
//       expect((() => validateOnClass.future(undefined))).toThrow();
//       expect((() => validateOnClass.future(new Date()))).toThrow();
//       expect((() => validateOnClass.rangeNumber(-1.01))).toThrow();
//       expect((() => validateOnClass.rangeNumber(1.01))).toThrow();
//       expect((() => validateOnClass.rangeNumber(undefined))).toThrow();
//       expect((() => validateOnClass.rangeNumber(null))).toThrow();
//       expect((() => validateOnClass.rangeDate(null))).toThrow();
//       expect((() => validateOnClass.rangeDate(undefined))).toThrow();
//       expect((() => validateOnClass.rangeDate(new Date(now + 1001)))).toThrow();
//       expect((() => validateOnClass.required(null))).toThrow();
//       expect((() => validateOnClass.required(undefined))).toThrow();
//     });
//   });
//   const validateOnMethod = new ValidateOnMethod();
//   describe('ValidateOnMethod', () => {
//     it('positive', () => {
//       expect((() => validateOnMethod.validate(1))).not.toThrow();
//       expect((() => validateOnMethod.noValidate(null))).not.toThrow();
//       expect((() => validateOnMethod.noValidate(undefined))).not.toThrow();
//     });
//     it('negative', () => {
//       expect((() => validateOnMethod.validate(null))).toThrow();
//     });
//   });

// });
