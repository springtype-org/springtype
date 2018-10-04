import {Component} from "../../../../src/package/di/src/decorator/Component";


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