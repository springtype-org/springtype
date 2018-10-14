import {Component} from "../../../../src/package/di";

export interface Todo {
    id: number;
    text: string;
}

@Component
export class TodoService {

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