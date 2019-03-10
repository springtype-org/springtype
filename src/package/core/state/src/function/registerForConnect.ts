import {connectComponent} from "./connectComponent";
import {ComponentReflector} from "../../../di";

export const registerForConnect = (prototype: any) => {
    ComponentReflector.addInitializer(prototype, (instance: any) => {
        connectComponent(instance);
    })
};