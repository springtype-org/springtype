// import es5 adapter for backward-compatibility
import "../adapter/es5";

import {WebComponentImpl} from "./../interface/WebComponentImpl";
import {registerWebComponent} from "../function/registerWebComponent";

export function Element<WC extends WebComponentImpl<any>>(tag: string): any {

    if (!tag) {
        throw new Error("@Element annotation must contain a tag name like: { tag: 'foo-bar-element', ... }");
    }

    // must contain a kebab-dash
    if (tag.indexOf('-') === -1) {
        throw new Error("@Element's tag name must be prefixed like: app-your-element-name. But this tag looks like: " + tag);
    }

    return (webComponent: WC) => {
        return registerWebComponent(tag, webComponent);
    }
}