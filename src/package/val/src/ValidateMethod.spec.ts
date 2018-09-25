import {assert} from 'chai';
import 'mocha';
import {Required} from "./decorators";
import {Validate} from "./ValidateMethod";


class ValidateMe {
    @Validate()
    validate(@Required() test: any) {
    }

    noValidate(@Required() test: any) {
    }
}

const validate = new ValidateMe();

describe('ValidateMethod', () => {
    it('positive', () => {
        assert.doesNotThrow(() => validate.validate(1));
        assert.doesNotThrow(() => validate.noValidate(null));
        assert.doesNotThrow(() => validate.noValidate(undefined));
    });
    it('negative', () => {
        assert.throws(() => validate.validate(null));
    });
});

