import {ComponentImpl} from "../../../di/src/interface/ComponentImpl";
import {WebComponentConfig} from "../interface/WebComponentConfig";
import {Component} from "../../../di";
import {createWebComponentClass} from "./createWebComponentClass";
import {WebComponentReflector} from "../WebComponentReflector";

export const registerWebComponent = (config: WebComponentConfig, webComponent: ComponentImpl<any>) => {
    
    // @Component by default
    const injectableWebComponent = Component(webComponent);
    const CustomWebComponent = createWebComponentClass(config, injectableWebComponent);
    const registeredCustomWebComponent = window.customElements.get(config.tag);

    if (!registeredCustomWebComponent) {

        // register custom element
        window.customElements.define(config.tag, CustomWebComponent);

        WebComponentReflector.setTagName(<any>CustomWebComponent, config.tag);
    }
    return CustomWebComponent;
};