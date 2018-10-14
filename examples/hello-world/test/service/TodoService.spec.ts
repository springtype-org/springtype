import {TestSuite} from "../../../../src/package/test/src/TestSuite";
import {Test} from "../../../../src/package/test/src/Test";
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