import "materialize-css";

import {WebComponent, Lifecycle, MeasureSpeed, UseWebComponent, ActiveRenderer} from "@springtype/core";
import {ROUTE_BASE, ROUTE_TODO_DETIALS, ROUTE_TODO_LIST} from "./routes";
import {TodoListPage} from "./page/TodoListPage";
import {TodoDetailsPage} from "./page/TodoDetailsPage";
import {NotFoundPage} from "./page/NotFoundPage";
import {Route} from "@springtype/router";
import {AppTranslationConfig} from "./translation-config";
import {ROUTE_NOT_FOUND} from "@springtype/router";
import {Logo} from "./element/logo/Logo";

@Route(ROUTE_BASE, TodoListPage)
@Route(ROUTE_TODO_LIST, TodoListPage)
@Route(ROUTE_TODO_DETIALS, TodoDetailsPage)
@Route(ROUTE_NOT_FOUND, NotFoundPage)

@WebComponent('example-todo-mvc')
@UseWebComponent(Logo)
export class ExampleTodoMVC extends HTMLElement implements Lifecycle {

    // inject AppTranslation to
    constructor(private appTranslation: AppTranslationConfig) {
        super();
    }

    render() {
        // use the router for this app
        return <st-router-outlet />;
    }
}