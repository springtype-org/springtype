import {TodoService} from "./TodoService";

export interface Todo {
    id: number;
    text: string;
}

@TestSuite
export class TodoServiceTest extends TodoService {

    constructor(protected console: Logger) {

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

        this.console.log('Test logging...');

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
}