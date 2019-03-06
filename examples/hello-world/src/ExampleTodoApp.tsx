import {WebApp} from "../../../src/package/html/src/decorator/WebApp";
import {TodoModel} from "./model/TodoModel";

import {AppLayout} from "./component/layout/AppLayout";
import {ROUTE_DEFAULT, ROUTE_TODO_DETIALS, ROUTE_TODO_LIST} from "./routes";
import {ExampleTodoList} from "./component/list/ExampleTodoList";
import {ExampleTodoDetail} from "./component/detail/ExampleTodoDetail";
import {Logo} from "./component/logo/Logo";

@WebApp({
    routes: {
        [ROUTE_DEFAULT]: <app-layout props={{ children: <example-todo-list /> }} />,
        [ROUTE_TODO_LIST]: <app-layout props={{ children: <example-todo-list /> }} />,
        [ROUTE_TODO_DETIALS]: <app-layout props={{ children: <example-todo-detail /> }} />,
    },
    components: {
        AppLayout,
        ExampleTodoList,
        ExampleTodoDetail,
        Logo
    },
    models: {
        TodoModel: TodoModel
    }
})
export class ExampleTodoApp {}