import {TestSuite} from "../../../../src/package/test/src/decorator/TestSuite";
import {Test} from "../../../../src/package/test/src/decorator/Test";
import {Todo, TodoService} from "../../src/service/TodoService";
import {ConsoleLogger} from "../../../../src/package/log";
import {Component} from "../../../../src/package/di";

// TODO: mocha/chai
@TestSuite
@Component
export class TodoServiceTest extends TodoService {

    constructor(protected log: ConsoleLogger) {
        super();
    }

    @Test({
        returns: [{
            id: 1,
            text: "Foo"
        }, {
            id: 2,
            text: "Bar"
        }]
    })
    getTodos(): Array<Todo> {

        this.log.log('Test logging...');

        return super.getTodos();
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
    getById(id: number): Todo {
        return super.getById(id);
    }

    @Test({
        returns: "Hello, world!"
    })
    helloWorld(): string {
        return TodoService.helloWorld();
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