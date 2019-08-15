
import {WebComponent, Lifecycle, ActiveRenderer} from "@springtype/core";
import {AppTranslationConfig} from "./translation-config";

@WebComponent('example-todo-mvc')
export class Index extends HTMLElement implements Lifecycle {

    constructor(private appTranslation: AppTranslationConfig) {
        super();
    }

    render() {
        // use the router for this app
        return <st-router-outlet />;
    }
}