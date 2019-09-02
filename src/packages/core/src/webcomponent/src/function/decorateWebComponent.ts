import {ComponentImpl} from "../../../di/src/interface/ComponentImpl";
import {Component, ComponentReflector} from "../../../di";
import {createWebComponentClass} from "./createWebComponentClass";
import {WebComponentReflector} from "../WebComponentReflector";
import {installInitialMutationObserver} from "./installInitialMutationObserver";

export const decorateWebComponent = (tagName: string, webComponent: ComponentImpl<any>) => {

    let CustomWebComponent;

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

    return CustomWebComponent;
};