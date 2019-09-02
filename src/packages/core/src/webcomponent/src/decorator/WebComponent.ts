import {WebComponentImpl} from "./../interface/WebComponentImpl";
import {decorateWebComponent} from "../function/decorateWebComponent";
import {error} from '../../../logger';

export function WebComponent<WC extends WebComponentImpl<any>>(tagName: string): any {
    
    return (webComponent: WC) => {

        if (!tagName) {
            error("The @WebComponent ", webComponent, " has no tag name! It should look like: @WebComponent('foo-bar-element')");
        }

        // must contain a kebab-dash
        if (tagName.indexOf('-') === -1) {
            error("The @WebComponent ", webComponent, " tag name is not prefixed. It should look like: app-your-element-name, but it is: " + tagName);
        }

        return decorateWebComponent(tagName, webComponent);
    }
}