import {ExampleTodoList} from "./page/list/ExampleTodoList";
import {WebModule} from "../../../src/package/html";
import {ExampleApp} from "./page/ExampleApp";
import {ExampleTodoDetail} from "./page/detail/ExampleTodoDetail";
import {ImprintPage} from "./page/imprint/ImprintPage";

@WebModule({
    routes: {
        '': ExampleApp,
        '/todos': ExampleTodoList,
        '/todo/:id': ExampleTodoDetail,
        '/imprint': ImprintPage
    }
})
export class ExampleAppModule {}