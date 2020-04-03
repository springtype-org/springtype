import { Component } from "../component";

export { IComponentOptions } from "./icomponent-options";
export { IComponentRegistry } from "./icomponent-registry";
export { IEvent, IEventListener } from "./ievent";
export { ILifecycle } from "./ilifecycle";

// exception from the ./interface folder rule (to only export interfaces and types)
// from within interface folders, because here we need a typeof of an actual implementation
// and once we would import the impl. inside of an interface, it becomes a dependency (of the interface)
// thus we have to invert the dependencies direction
export type IComponent = typeof Component;
