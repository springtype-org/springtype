import {Component} from "../../../../src/package/di";
import {TodoModel} from "../model/TodoModel";

export interface Todo {
    id: number;
    text: string;
}

@Component
export class TodoService {

    constructor(
        // state model
        protected todoModel: TodoModel
    ) {

        console.log('todoModel', todoModel);
    }

    data: Array<Todo> = [{
        id: 1,
        text: "Foo"
    }, {
        id: 2,
        text: "Bar"
    }];

    getTodos(): Array<Todo> {
        return this.data;
    }

    getById(id: number): Todo {

        return this.data.filter((todo: Todo) => {
            return todo.id === id;
        })[0];
    }

    static helloWorld(): string {
        return "Hello, world!";
    }
}