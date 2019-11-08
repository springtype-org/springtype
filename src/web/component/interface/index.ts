export { IComponentOptions } from "./icomponent-options";
export { IComponentRegistry } from "./icomponent-registry";
export { IEvent, IEventListener } from "./ievent";
export { IStateChange } from "./ion-state-change";

export const INTERNAL: any = "INTERNAL";

// exception from the ./interface folder rule (to only export interfaces and types)
// from within interface folders, because here we need a typeof of an actual implementation
// and once we would import the impl. inside of an interface, it becomes a dependency (of the interface)
// thus we have to invert the dependencies direction
export type IComponent = any;//typeof Component;
