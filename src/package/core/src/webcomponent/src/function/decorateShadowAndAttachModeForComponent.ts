import {ShadowAttachMode} from "../../index";
import {ComponentReflector} from "../../../di";
import {
    getShadowAttachModeForComponent,
    getShadowForComponent,
    setShadowAttachModeForComponent,
    setShadowForComponent
} from "../reflector/protoype/shadow";
import {setShadowRootForComponent} from "../reflector/instance/shadowRoot";

export const decorateShadowAndAttachModeForComponent = (webComponent: any, shadowAttachMode?: ShadowAttachMode) => {

    setShadowForComponent(webComponent, true);

    if (shadowAttachMode) {
        setShadowAttachModeForComponent(webComponent, shadowAttachMode);
    }

    ComponentReflector.addInitializer(webComponent, (instance: any) => {

        const shadow = getShadowForComponent(webComponent);

        if (shadow) {

            const shadowAttachMode = getShadowAttachModeForComponent(webComponent);
            const shadowRoot = instance.attachShadow({
                mode: shadowAttachMode ? shadowAttachMode : ShadowAttachMode.OPEN
            });
            setShadowRootForComponent(instance, shadowRoot);
        }
    });
};