import "materialize-css";

import {Element, Lifecycle, MeasureSpeed, ReloadOnCodeChange, UseElement} from "@springtype/springtype-incubator-core";
import {ROUTE_BASE, ROUTE_TODO_DETIALS, ROUTE_TODO_LIST} from "./routes";
import {TodoListPage} from "./page/TodoListPage";
import {TodoDetailsPage} from "./page/TodoDetailsPage";
import {NotFoundPage} from "./page/NotFoundPage";
import {Route} from "@springtype/springtype-incubator-router";
import {AppTranslationConfig} from "./translation-config";
import {ROUTE_NOT_FOUND} from "@springtype/springtype-incubator-router";
import {Logo} from "./component/logo/Logo";

@ReloadOnCodeChange

@Route(ROUTE_BASE, TodoListPage)
@Route(ROUTE_TODO_LIST, TodoListPage)
@Route(ROUTE_TODO_DETIALS, TodoDetailsPage)
@Route(ROUTE_NOT_FOUND, NotFoundPage)

@Element('example-todo-mvc')
@UseElement(Logo)
export class ExampleTodoMVC extends HTMLElement implements Lifecycle {

    // inject AppTranslation to
    constructor(private appTranslation: AppTranslationConfig) {
        super();

        //this.measure();
    }

    render() {
        // use the router for this app
        return <st-router-outlet />;
    }

    measure() {
        this.ioWeakMap();
        this.ioReflect();
    }

    @MeasureSpeed
    ioWeakMap() {

        const wm = new WeakMap();

        for (let i=0; i<10000; i++) {

            let ele = document.createElement('app-logo');

            wm.set(ele, i);
            let x = wm.get(ele);
            wm.set(ele, x+1);
        }
    }

    @MeasureSpeed
    ioReflect() {

        for (let i=0; i<10000; i++) {

            let ele = document.createElement('app-logo');

            Reflect.set(ele, 'index', i);
            let x = Reflect.get(ele, 'index');
            Reflect.set(ele, 'index', x+1);
        }
    }
}