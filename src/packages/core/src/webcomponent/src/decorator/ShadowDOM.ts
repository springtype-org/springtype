import {ShadowAttachMode} from "../../index";
import {decorateShadowAndAttachModeForComponent} from "../function/decorateShadowAndAttachModeForComponent";

export function ShadowDOM(shadowAttachModeOrComponent?: any|ShadowAttachMode): any {

    if (typeof shadowAttachModeOrComponent === 'function') {

        decorateShadowAndAttachModeForComponent(shadowAttachModeOrComponent);

    } else {

        return (targetWebComponent: any) => {

            decorateShadowAndAttachModeForComponent(targetWebComponent, shadowAttachModeOrComponent);

            return targetWebComponent;
        }
    }
}