import {ShadowAttachMode} from "../../index";
import {SHADOW} from "../constant/SHADOW";
import {SHADOW_ATTACH_MODE} from "../constant/SHADOW_ATTACH_MODE";
import {registerTransparentAttributeHooks} from "./registerTransparentAttributeHooks";
import {defaultInitializeTransparentAttributes} from "./defaultInitializeTransparentAttributes";
import {ComponentReflector} from "../../../di";
import {registerTransparentAttributeGetterAndSetter} from "./registerTransparentAttributeGetterAndSetter";
import {getShadowForComponent} from "./getShadowForComponent";
import {getShadowAttachModeForComponent} from "./getShadowAttachModeForComponent";

export const setShadowAndAttachModeForComponent = (webComponent: any, shadowAttachMode?: ShadowAttachMode) => {

    Reflect.set(webComponent, SHADOW, true);

    if (shadowAttachMode) {
        Reflect.set(webComponent, SHADOW_ATTACH_MODE, shadowAttachMode);
    }

    ComponentReflector.addInitializer(webComponent, (instance: any) => {

        console.log('@ShadowDOM initializer', instance)

        // TODO: Impl as initializer
        const shadow = getShadowForComponent(webComponent);

        if (shadow) {

            const shadowAttachMode = getShadowAttachModeForComponent(webComponent);
            instance._shadowRoot = instance.attachShadow({
                mode: shadowAttachMode ? shadowAttachMode : ShadowAttachMode.OPEN
            });
        }
    });
};