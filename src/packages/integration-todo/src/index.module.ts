
import { Module } from "@springtype/core";
import { Route, ROUTE_NOT_FOUND } from "@springtype/router";
import { applyPolyfill, ReflowStrategy } from "custom-elements-hmr-polyfill";
import { AppLayout } from "./element/layout/AppLayout";
import { ListInnerPartial } from "./element/list/ListInnerPartial";
import { Logo } from "./element/logo/Logo";
import { Index } from "./index";
import { NotFoundPage } from "./page/NotFoundPage";
import { TodoDetailsPage } from "./page/TodoDetailsPage";
import { TodoListPage } from "./page/TodoListPage";

if (process.env.NODE_ENV === 'development') {
    applyPolyfill(ReflowStrategy.NONE, -1, () => {
        document.location.reload();
    });
}

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