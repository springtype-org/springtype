import {Element, WebComponentLifecycle} from "@springtype/springtype-incubator-core";

@Element('app-not-found-page')
export class NotFoundPage extends HTMLElement implements WebComponentLifecycle {

    render() {
        return <div>405 I'm a teapot.</div>;
    }
}