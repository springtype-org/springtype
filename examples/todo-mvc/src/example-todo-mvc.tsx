import "materialize-css";

import {ReloadOnCodeChange, Lifecycle, Element} from "@springtype/springtype-incubator-core";
import {ROUTE_BASE, ROUTE_TODO_DETIALS, ROUTE_TODO_LIST} from "./routes";
import {TodoListPage} from "./page/TodoListPage";
import {TodoDetailsPage} from "./page/TodoDetailsPage";
import {NotFoundPage} from "./page/NotFoundPage";
import {Route} from "../../../src/package/core";
import {ROUTE_NOT_FOUND} from "@springtype/springtype-incubator-core";
import {AppTranslationConfig} from "./translation-config";
import {CaseTransformer} from "@springtype/springtype-incubator-core";

@ReloadOnCodeChange

@Route(ROUTE_BASE, TodoListPage)
@Route(ROUTE_TODO_LIST, TodoListPage)
@Route(ROUTE_TODO_DETIALS, TodoDetailsPage)
@Route(ROUTE_NOT_FOUND, NotFoundPage)

@Element('example-todo-mvc')
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