import {WebComponent, WebComponentLifecycle} from "../../../src/package/core/webcomponent";

@WebComponent({
    tag: 'app-page-404'
})
export class Page404 extends HTMLElement implements WebComponentLifecycle {

    render() {
        return <div>405 I'm a teapot.</div>;
    }
}