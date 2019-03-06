import {WebComponentLifecycle, WebComponent} from "../../../../../src/package/html";
import template from "./Logo.tpl";

@WebComponent({
    tag: 'app-logo',
    template
})
export class Logo extends HTMLElement implements WebComponentLifecycle {
}