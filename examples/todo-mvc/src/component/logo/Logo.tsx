import {Template, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import template from "./Logo.tpl";

@WebComponent({
    tag: 'app-logo'
})
@Template(template)
export class Logo extends HTMLElement implements WebComponentLifecycle {
}