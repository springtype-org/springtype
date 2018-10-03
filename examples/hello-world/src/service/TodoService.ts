import {Component} from "../../../../dist/index";

export interface Todo {
    text: string;
}

@Component
export class TodoService {

    getTodos(): Array<Todo> {

        return [{
            text: "Foo"
        }, {
            text: "Bar"
        }]
    }
}