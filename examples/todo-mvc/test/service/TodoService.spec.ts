import {TestSuite, Test, Component, ConsoleLogger} from "@springtype/springtype-incubator-core";
import {TodoService} from "../../src/service/TodoService";
import {IRootState} from "../../src/state/IRootState";
import {Stateful} from "@springtype/springtype-incubator-core";
import {ITodoItem} from "../../src/state/ITodoState";

// TODO: mocha/chai
@TestSuite
@Stateful
@Component
export class TodoServiceTest extends TodoService {

    constructor(public state: IRootState, protected log: ConsoleLogger) {
        super(state);
    }

    @Test({
        params: [1],
        returns: {
            id: 1,
            text: "Foo"
        }
    })
    @Test({
        params: [2],
        returns: {
            id: 2,
            text: "Bar"
        }
    })
    getById(id: number): ITodoItem {
        return super.getById(id);
    }
}

@Component
class whatever2 {

    calc(n: number, n2: number): number {
        return n + n2;
    }
}

class whatever2Test extends whatever2 {

    @Test({
        params: [2, 2],
        returns: 4
    })
    calc(n: number, n2: number): number {
        return super.calc(n, n2);
    }
}

@TestSuite
@Component
class whatever {

    constructor(private whatEver: whatever2Test) {}

    @Test({
        params: ['foo'],
        returns: 'foo4'
    })
    testFoo(text: string): string {
        return `${text}${this.whatEver.calc(2,2)}`;
    }
}