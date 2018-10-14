import {Try, UndefinedError} from "../../package/lang";
import {expect} from "chai";

describe('lang', () => {
    it('Try ', function () {
        const array = ["first"];
        expect(Try.of(() => array[1]).recover(UndefinedError,
            () => "second").get()).to.equal("second")

    });
    it('Try o ', function () {
        const o: any = {};
        expect(
            Try.of(() => o["dsdf"]["jkj"])
            .recover(TypeError,
            () => "second").isSuccess()).to.equal(true)

    });
});


