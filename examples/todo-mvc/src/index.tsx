import "materialize-css";

import {ROUTE_WILDCARD, WebApp} from "@springtype/springtype-incubator-core";
import {TodoModel} from "./model/TodoModel";
import {AppLayout} from "./component/layout/AppLayout";
import {ROUTE_DEFAULT, ROUTE_TODO_DETIALS, ROUTE_TODO_LIST} from "./routes";
import {ExampleTodoList} from "./component/list/ExampleTodoList";
import {ExampleTodoDetail} from "./component/detail/ExampleTodoDetail";
import {Logo} from "./component/logo/Logo";
import {Page404} from "./page404";

const listWithLayout = <app-layout props={{ children: <example-todo-list /> }} />;

@WebApp({
    routes: {
        [ROUTE_WILDCARD]: Page404,
        [ROUTE_DEFAULT]: listWithLayout,
        [ROUTE_TODO_LIST]: listWithLayout,
        [ROUTE_TODO_DETIALS]: <app-layout props={{ children: <example-todo-detail /> }} />,
    },
    components: [
        AppLayout,
        ExampleTodoList,
        ExampleTodoDetail,
        Logo
    ],
    models: {
        TodoModel: TodoModel
    }
})
export class Index {}