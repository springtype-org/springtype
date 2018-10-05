import {ExampleTodoList} from "./view/list/ExampleTodoList";
import {WebModule} from "../../../src/package/html";
import {ExampleApp} from "./view/ExampleApp";
import {ExampleTodoDetail} from "./view/detail/ExampleTodoDetail";

@WebModule({
    routes: {
        '': ExampleApp,
        '/todos': ExampleTodoList,
        '/todo/:id': ExampleTodoDetail
    }
})
export class ExampleAppModule {}