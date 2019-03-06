import {WebApp} from "../../../src/package/html/src/decorator/WebApp";
import {TodoModel} from "./model/TodoModel";

import {AppLayout} from "./component/layout/AppLayout";
import {ROUTE_DEFAULT, ROUTE_TODO_DETIALS, ROUTE_TODO_LIST} from "./routes";
import {ExampleTodoList} from "./component/list/ExampleTodoList";
import {ExampleTodoDetail} from "./component/detail/ExampleTodoDetail";
import {Logo} from "./component/logo/Logo";
import {ROUTE_WILDCARD} from "../../../src/package/html/src/router/IRouter";

const listWithLayout = <app-layout props={{ children: <example-todo-list /> }} />;

@WebApp({
    routes: {
        [ROUTE_WILDCARD]: <div>405 I'm a teapot.</div>,
        [ROUTE_DEFAULT]: listWithLayout,
        [ROUTE_TODO_LIST]: listWithLayout,
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
export class Index {}