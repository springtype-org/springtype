import {Try} from "../../package/lang";
import {NonFatalError} from "../../package/lang/src/errors";
import {UndefinedError} from "../../package/lang/src/errors/UndefinedError";

describe('Try', () => {

    beforeEach(() => {
        console.log("asdasd")

    });

    describe('recover', () => {
        const array = ["first"];
        const failure: Try<string> = Try.of(
            () => array[1]);

        failure.recover(UndefinedError,
            () => "second");
    });

});


