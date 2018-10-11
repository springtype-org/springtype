import {ExampleTodoList} from "./page/list/ExampleTodoList";
import {WebModule} from "../../../src/package/html";
import {ExampleAppLayout} from "./page/ExampleAppLayout";
import {ExampleTodoDetail} from "./page/detail/ExampleTodoDetail";
import {ImprintPage} from "./page/imprint/ImprintPage";

@WebModule({
    routes: {
        '': ExampleAppLayout,
        '/todos': ExampleTodoList,
        '/todo/:id': ExampleTodoDetail,
        '/imprint': ImprintPage
    }
})
export class ExampleApp {}