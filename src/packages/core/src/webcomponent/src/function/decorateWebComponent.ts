import {ComponentImpl} from "../../../di/src/interface/ComponentImpl";
import {Component, ComponentReflector} from "../../../di";
import {createWebComponentClass} from "./createWebComponentClass";
import {WebComponentReflector} from "../WebComponentReflector";
import {installInitialMutationObserver} from "./installInitialMutationObserver";

export const decorateWebComponent = (tagName: string, webComponent: ComponentImpl<any>) => {
    
    // @Component by default
    const injectableWebComponent = Component(webComponent);
    const CustomWebComponent = createWebComponentClass(tagName, injectableWebComponent);
    const registeredCustomWebComponent = window.customElements.get(tagName);

    if (!registeredCustomWebComponent) {

        // register custom element
        window.customElements.define(tagName, CustomWebComponent);

        WebComponentReflector.setTagName(<any>CustomWebComponent, tagName);

        WebComponentReflector.registerByTagName(tagName);
    }

    ComponentReflector.addInitializer(CustomWebComponent, (instance: any) => {

        installInitialMutationObserver(instance, tagName);
    });

    return CustomWebComponent;
};