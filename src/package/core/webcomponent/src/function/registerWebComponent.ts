import {ComponentImpl} from "../../../di/src/interface/ComponentImpl";
import {Component} from "../../../di";
import {createWebComponentClass} from "./createWebComponentClass";
import {WebComponentReflector} from "../WebComponentReflector";

export const registerWebComponent = (tag: string, webComponent: ComponentImpl<any>) => {
    
    // @Component by default
    const injectableWebComponent = Component(webComponent);
    const CustomWebComponent = createWebComponentClass(tag, injectableWebComponent);
    const registeredCustomWebComponent = window.customElements.get(tag);

    if (!registeredCustomWebComponent) {

        // register custom element
        window.customElements.define(tag, CustomWebComponent);

        WebComponentReflector.setTagName(<any>CustomWebComponent, tag);
    }
    return CustomWebComponent;
};