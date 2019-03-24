import "materialize-css";

import {ReloadOnCodeChange, WebComponentLifecycle, Element, log} from "@springtype/springtype-incubator-core";
import {ROUTE_BASE, ROUTE_TODO_DETIALS, ROUTE_TODO_LIST} from "./routes";
import {TodoListPage} from "./page/TodoListPage";
import {TodoDetailsPage} from "./page/TodoDetailsPage";
import {NotFoundPage} from "./page/NotFoundPage";
import {Route} from "../../../src/package/core";
import {ROUTE_NOT_FOUND} from "@springtype/springtype-incubator-core";
import * as englishTranslations from "./translation/en.json";
import * as germanTranslations from "./translation/de.json";
import {Translator, Translations, t} from "@springtype/springtype-incubator-i18n";

@ReloadOnCodeChange
@Route(ROUTE_BASE, TodoListPage)
@Route(ROUTE_TODO_LIST, TodoListPage)
@Route(ROUTE_TODO_DETIALS, TodoDetailsPage)
@Route(ROUTE_NOT_FOUND, NotFoundPage)
@Translations('en', englishTranslations)
@Translations('de', germanTranslations)
@Element('example-todo-mvc')
export class ExampleTodoMVC extends HTMLElement implements WebComponentLifecycle {

    constructor(
        private translator: Translator
    ) {
        super();

        this.setupTranslation();
    }

    async setupTranslation() {

        // wait for translator
        await this.translator.isInitialized();

        // re-flow when translations are loaded
        this.flow();
    }

    render() {

        // use the router for this app
        return <st-router-outlet />;
    }
}