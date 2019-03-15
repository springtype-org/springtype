import {WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";

@WebComponent('app-not-found-page')
export class NotFoundPage extends HTMLElement implements WebComponentLifecycle {

    render() {
        return <div>405 I'm a teapot.</div>;
    }
}