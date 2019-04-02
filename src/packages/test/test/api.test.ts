import {TestCaseRunner} from "../src/interface/TestCaseRunner";
import {TestSuite} from "../src/decorator/TestSuite";
import {TestCase} from "../src/decorator/TestCase";
import {ActiveLogger} from "../../core/src/logger/src/ActiveLogger";

class NiceError extends Error {
    isNice: true;
}

class ExampleImpl {

    multiply(a: number, b: number): number {
        return a * b;
    }

    multiplyPromised(a: number, b: number): Promise<number> {
        return Promise.resolve(a * b);
    }

    throwANiceError() {
        throw new NiceError();
    }

    throwANiceErrorMessage() {
        throw new Error("Some nice message");
    }
}

@TestSuite
export class ExampleImplTest extends ExampleImpl implements TestCaseRunner {

    constructor(protected logger: ActiveLogger) {
        super();
    }

    before() {
        this.logger.log('Before TestCase being executed in TestSuite ExampleImplTest');
    }

    @TestCase({
        name: 'Testing NiceError throw using reference by function pointer',
        method: ExampleImplTest.prototype.throwANiceError,
        throws: NiceError
    })

    @TestCase({
        name: 'Testing NiceError throw error with message using reference by function pointer',
        method: ExampleImplTest.prototype.throwANiceErrorMessage,
        throws: "Some nice message"
    })

    @TestCase({
        name: 'Testing NiceError throw error with message using name of the method',
        method: "throwANiceErrorMessage",
        throws: "Some nice message"
    })

    @TestCase({
        name: 'Testing NiceError throw using inheritance (TestCase assigned to inherited method)',
        throws: "Some nice message"
    })
    throwANiceErrorMessage() {
        return super.throwANiceErrorMessage();
    }

    @TestCase({
        method: ExampleImplTest.prototype.multiplyPromised,
        params: [2, 5],
        returnsWithin: 2,
        returns: 10
    })

    @TestCase({
        method: ExampleImplTest.prototype.multiply,
        params: [1, 8],
        returns: 8
    })

    @TestCase({
        method: ExampleImplTest.prototype.multiply,
        params: [20, 20],
        test: (returnValue: number) => returnValue === 400
    })

    runTestCases() {}

    after() {
        this.logger.log('After TestCases have been executed in TestSuite ExampleImplTest');
    }
}