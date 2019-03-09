import "materialize-css";

import {ROUTE_NOT_FOUND, WebApp} from "@springtype/springtype-incubator-core";
import {TodoModel} from "./model/TodoModel";
import {AppLayout} from "./component/layout/AppLayout";
import {ROUTE_DEFAULT, ROUTE_TODO_DETIALS, ROUTE_TODO_LIST} from "./routes";
import {ExampleTodoList} from "./component/list/ExampleTodoList";
import {ExampleTodoDetail} from "./component/detail/ExampleTodoDetail";
import {Logo} from "./component/logo/Logo";
import {NotFoundPage} from "./page/NotFoundPage";
import {Route} from "../../../src/package/core";

const listWithLayout = <app-layout props={{ children: <example-todo-list /> }} />;

@WebApp({
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
@Route(ROUTE_DEFAULT, listWithLayout)
@Route(ROUTE_TODO_LIST, listWithLayout)
@Route(ROUTE_TODO_DETIALS, <app-layout props={{ children: <example-todo-detail /> }} />)
@Route(ROUTE_NOT_FOUND, NotFoundPage)
export class Index {}