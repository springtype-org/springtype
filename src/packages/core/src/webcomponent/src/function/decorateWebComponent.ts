import { Component, ComponentReflector } from "../../../di";
import { ComponentImpl } from "../../../di/src/interface/ComponentImpl";
import { WebComponentReflector } from "../WebComponentReflector";
import { createWebComponentClass } from "./createWebComponentClass";
import { installInitialMutationObserver } from "./installInitialMutationObserver";

export const decorateWebComponent = (tagName: string, webComponent: ComponentImpl<any>) => {

    let CustomWebComponent;
    const registeredCustomWebComponent = window.customElements.get(tagName);

    if (!registeredCustomWebComponent) {

        // @Component by default
        const injectableWebComponent = Component(webComponent);
        CustomWebComponent = createWebComponentClass(tagName, injectableWebComponent);
        // register custom element
        window.customElements.define(tagName, CustomWebComponent);

        WebComponentReflector.setTagName(<any>CustomWebComponent, tagName);

        WebComponentReflector.registerByTagName(tagName, CustomWebComponent);

        ComponentReflector.addInitializer(CustomWebComponent, (instance: any) => {
            installInitialMutationObserver(instance, tagName);
        });

    } else {
        CustomWebComponent = WebComponentReflector.getByTagName(tagName);
    }
    return CustomWebComponent;
};