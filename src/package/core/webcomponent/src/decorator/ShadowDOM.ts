import {WebComponentImpl} from "../interface/WebComponentImpl";
import {StyleFunction} from "../../../tss";
import {setStyleForComponent} from "../function/setStyleForComponent";
import {ShadowAttachMode} from "../../index";
import {setShadowAndAttachModeForComponent} from "../function/setShadowAndAttachModeForComponent";

export function ShadowDOM(shadowAttachModeOrComponent?: any): any {

    if (typeof shadowAttachModeOrComponent === 'function') {

        setShadowAndAttachModeForComponent(shadowAttachModeOrComponent);

    } else {

        return (targetWebComponent: any) => {

            setShadowAndAttachModeForComponent(targetWebComponent, shadowAttachModeOrComponent);

            return targetWebComponent;
        }
    }
}