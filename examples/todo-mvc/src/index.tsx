import "materialize-css";

import {ReloadOnCodeChange} from "@springtype/springtype-incubator-core";
import {ROUTE_DEFAULT, ROUTE_TODO_DETIALS, ROUTE_TODO_LIST} from "./routes";
import {TodoListPage} from "./page/TodoListPage";
import {TodoDetailsPage} from "./page/TodoDetailsPage";
import {NotFoundPage} from "./page/NotFoundPage";
import {Route} from "../../../src/package/core";
import {ROUTE_NOT_FOUND} from "@springtype/springtype-incubator-core";


@ReloadOnCodeChange
@Route(ROUTE_DEFAULT, TodoListPage)
@Route(ROUTE_TODO_LIST, TodoListPage)
@Route(ROUTE_TODO_DETIALS, TodoDetailsPage)
@Route(ROUTE_NOT_FOUND, NotFoundPage)
export class Index {}