import {assert} from 'chai';
import 'mocha';
import {Validation} from "./ValidateClass";
import {
    Future,
    IsDate,
    IsDefined,
    IsNumber,
    IsString,
    Max,
    Min,
    NotEmpty,
    NotNull,
    Past,
    Range,
    Required
} from "./decorators";

const now = Date.now();
const pastDate = new Date(now - 1000);
const nowDate = new Date(now);
const futureDate = new Date(now + 1000);

@Validation()
class ValidateMe {
    notNull(@NotNull() test: any) {
    }

    isDate(@IsDate() test: any) {
    }

    isDefined(@IsDefined() test: any) {
    }

    isNumber(@IsNumber() test: any) {
    }

    isString(@IsString() test: any) {
    }

    maxNumber(@Max(2) test: any) {
    }

    minNumber(@Min(0) test: any) {
    }

    maxDate(@Max(futureDate) test: any) {
    }

    minDate(@Min(pastDate) test: any) {
    }

    past(@Past() test: any) {
    }

    future(@Future() test: any) {
    }

    rangeNumber(@Range(-1, 1) test: any) {
    }

    rangeDate(@Range(pastDate, futureDate) test: any) {
    }

    notEmpty(@NotEmpty({full: true}) test: any) {
    }

    notEmptyRequired(@NotEmpty({required: false}) test: any) {
    }
    required(@Required() test: any) {
    }
}

const validate = new ValidateMe();

describe('ValidateClass', () => {
    it('positive', () => {
        assert.doesNotThrow(() => validate.notNull(1));
        assert.doesNotThrow(() => validate.notNull(undefined));
        assert.doesNotThrow(() => validate.notEmpty('text'));
        assert.doesNotThrow(() => validate.notEmptyRequired(null));
        assert.doesNotThrow(() => validate.notEmptyRequired(undefined));
        assert.doesNotThrow(() => validate.isDefined(1));
        assert.doesNotThrow(() => validate.isDefined(null));
        assert.doesNotThrow(() => validate.isDate(new Date()));
        assert.doesNotThrow(() => validate.isNumber(1));
        assert.doesNotThrow(() => validate.isNumber(-1));
        assert.doesNotThrow(() => validate.isNumber(0));
        assert.doesNotThrow(() => validate.isNumber(1e5));
        assert.doesNotThrow(() => validate.isString('dfdds'));
        assert.doesNotThrow(() => validate.isString(new String(33)));
        assert.doesNotThrow(() => validate.maxNumber(2));
        assert.doesNotThrow(() => validate.maxNumber(-21));
        assert.doesNotThrow(() => validate.maxNumber(0));
        assert.doesNotThrow(() => validate.minNumber(2));
        assert.doesNotThrow(() => validate.minNumber(21));
        assert.doesNotThrow(() => validate.minNumber(0));
        assert.doesNotThrow(() => validate.maxDate(pastDate));
        assert.doesNotThrow(() => validate.maxDate(nowDate));
        assert.doesNotThrow(() => validate.maxDate(futureDate));
        assert.doesNotThrow(() => validate.minDate(futureDate));
        assert.doesNotThrow(() => validate.minDate(pastDate));
        assert.doesNotThrow(() => validate.minDate(nowDate));
        assert.doesNotThrow(() => validate.past(nowDate));
        assert.doesNotThrow(() => validate.past(pastDate));
        assert.doesNotThrow(() => validate.future(new Date(Date.now() + 1000 * 60)));
        assert.doesNotThrow(() => validate.rangeNumber(-1));
        assert.doesNotThrow(() => validate.rangeNumber(0));
        assert.doesNotThrow(() => validate.rangeNumber(1));
        assert.doesNotThrow(() => validate.rangeNumber(0.9));
        assert.doesNotThrow(() => validate.rangeDate(futureDate));
        assert.doesNotThrow(() => validate.rangeDate(pastDate));
        assert.doesNotThrow(() => validate.rangeDate(nowDate));
        assert.doesNotThrow(() => validate.required(nowDate));
        assert.doesNotThrow(() => validate.required({}));
        assert.doesNotThrow(() => validate.required([]));
    });
    it('negative', () => {
        assert.throws(() => validate.notNull(null));
        assert.throws(() => validate.notEmpty(['']));
        assert.throws(() => validate.notEmpty(''));
        assert.throws(() => validate.notEmptyRequired([null]));
        assert.throws(() => validate.notEmptyRequired([undefined]));
        assert.throws(() => validate.isDefined(undefined));
        assert.throws(() => validate.isDate(undefined));
        assert.throws(() => validate.isDate(null));
        assert.throws(() => validate.isNumber(null));
        assert.throws(() => validate.isNumber(undefined));
        assert.throws(() => validate.isNumber([]));
        assert.throws(() => validate.isNumber(new Date()));
        assert.throws(() => validate.isString(undefined));
        assert.throws(() => validate.isString(null));
        assert.throws(() => validate.isString(2));
        assert.throws(() => validate.isString(new Date()));
        assert.throws(() => validate.maxNumber(3));
        assert.throws(() => validate.maxNumber(1e3));
        assert.throws(() => validate.maxNumber(null));
        assert.throws(() => validate.maxNumber(undefined));
        assert.throws(() => validate.minNumber(-3));
        assert.throws(() => validate.minNumber(-1e-2));
        assert.throws(() => validate.minNumber(null));
        assert.throws(() => validate.minNumber(undefined));
        assert.throws(() => validate.maxDate(new Date(now + 1001)));
        assert.throws(() => validate.maxDate(undefined));
        assert.throws(() => validate.maxDate(null));
        assert.throws(() => validate.minDate(new Date(now - 1001)));
        assert.throws(() => validate.minDate(undefined));
        assert.throws(() => validate.minDate(null));
        assert.throws(() => validate.past(null));
        assert.throws(() => validate.past(undefined));
        assert.throws(() => validate.past(new Date(Date.now() + 1000 * 60)));
        assert.throws(() => validate.future(null));
        assert.throws(() => validate.future(undefined));
        assert.throws(() => validate.future(new Date()));
        assert.throws(() => validate.rangeNumber(-1.01));
        assert.throws(() => validate.rangeNumber(1.01));
        assert.throws(() => validate.rangeNumber(undefined));
        assert.throws(() => validate.rangeNumber(null));
        assert.throws(() => validate.rangeDate(null));
        assert.throws(() => validate.rangeDate(undefined));
        assert.throws(() => validate.rangeDate(new Date(now + 1001)));
        assert.throws(() => validate.required(null));
        assert.throws(() => validate.required(undefined));
    });
});

