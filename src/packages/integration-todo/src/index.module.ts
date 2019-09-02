import { applyPolyfill, ReflowStrategy, rerenderInnerHTML } from "custom-elements-hmr-polyfill";

applyPolyfill(ReflowStrategy.RERENDER_INNER_HTML, 250, () => {

    rerenderInnerHTML();  
});
 
// materialize JS import
import "materialize-css";

// CSS import
import "./index.scss";

import {Module} from "@springtype/core";
import {AppLayout} from "./element/layout/AppLayout";
import {ListInnerPartial} from "./element/list/ListInnerPartial";
import {Logo} from "./element/logo/Logo";
import {NotFoundPage} from "./page/NotFoundPage";
import {TodoDetailsPage} from "./page/TodoDetailsPage";
import {TodoListPage} from "./page/TodoListPage";
import {Index} from "./index";
import {Route, ROUTE_NOT_FOUND} from "@springtype/router";

export const ROUTE_BASE = '';
export const ROUTE_TODO_LIST = '/todos';
export const ROUTE_TODO_DETIALS = '/todo/:id';

@Module(
    'index',

    Index,

    // elements
    AppLayout,
    ListInnerPartial,
    Logo,

    // pages
    NotFoundPage,
    TodoDetailsPage,
    TodoListPage
)
@Route(ROUTE_BASE, TodoListPage)
@Route(ROUTE_TODO_LIST, TodoListPage)
@Route(ROUTE_TODO_DETIALS, TodoDetailsPage)
@Route(ROUTE_NOT_FOUND, NotFoundPage)
export class IndexModule {
}