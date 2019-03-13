// import es5 adapter for backward-compatibility
import "../adapter/es5";

import {WebComponentImpl} from "./../interface/WebComponentImpl";
import {WebComponentConfig} from "./../interface/WebComponentConfig";
import {RenderStrategy} from "./../enum/RenderStrategy";
import {DEFAULT_PROPS_FIELD_NAME} from "./../constant/DEFAULT_PROPS_FIELD_NAME";
import {registerWebComponent} from "../function/registerWebComponent";

export function WebComponent<WC extends WebComponentImpl<any>>(config: WebComponentConfig): any {

    // default re-render strategy: when observeAttributes object changes
    if (!config.renderStrategy) config.renderStrategy = RenderStrategy.OnFieldChanges;

    if (!config.propsField) config.propsField = DEFAULT_PROPS_FIELD_NAME;

    if (!config.tag) {
        throw new Error("@WebComponent annotation must contain a tag name like: { tag: 'foo-bar-element', ... }");
    }

    // must contain a kebab-dash
    if (config.tag.indexOf('-') === -1) {
        throw new Error("WebComponent's tag name must be prefixed like: app-your-element-name. But this tag looks like: " + config.tag);
    }

    return (webComponent: WC) => {
        return registerWebComponent(config, webComponent);
    }
}