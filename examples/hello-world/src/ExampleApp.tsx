import {ExampleTodoList} from "./page/list/ExampleTodoList";
import {ExampleAppLayout} from "./page/ExampleAppLayout";
import {ExampleTodoDetail} from "./page/detail/ExampleTodoDetail";
import {ImprintPage} from "./page/imprint/ImprintPage";
import {WebApp} from "../../../src/package/html/src/decorator/WebApp";
import {TodoModel} from "./model/TodoModel";

@WebApp({
    routes: {
        '': ExampleAppLayout,
        '/todos': ExampleTodoList,
        '/todo/:id': ExampleTodoDetail,
        '/imprint': ImprintPage
    },
    models: {
        TodoModel: TodoModel
    }
})
export class ExampleApp {}