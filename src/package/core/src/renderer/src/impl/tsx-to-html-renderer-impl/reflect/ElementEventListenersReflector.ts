import {EventListenersMap} from "../interface/EventListenersMap";

export class ElementEventListenersReflector {

    // automatically forgets about all listeners of an element
    // once the element is not referenced anymore (in the JS VM)
    static ELEMENT_LISTENER_CACHE = new WeakMap();

    static getEventListeners(element: Element): EventListenersMap {
        return ElementEventListenersReflector.ELEMENT_LISTENER_CACHE.get(element) || {};
    }

    static setEventListeners(element: Element, eventListeners: EventListenersMap): void  {
        ElementEventListenersReflector.ELEMENT_LISTENER_CACHE.set(element, eventListeners);
    }

    static setEventListener(element: Element, eventName: string, callback: EventListenerOrEventListenerObject): void {
        const eventListeners = ElementEventListenersReflector.getEventListeners(element);

        // initialize event listeners array
        if (!eventListeners[eventName]) {
            eventListeners[eventName] = [];
        }
        eventListeners[eventName].push(callback);

        ElementEventListenersReflector.setEventListeners(element, eventListeners);
    }

    static getEventListenersOfType(element: Element, eventName: string): Array<EventListenerOrEventListenerObject> {
        const eventListeners = ElementEventListenersReflector.getEventListeners(element);
        return eventListeners[eventName] || [];
    }

    static setEventListenersOfType(element: Element, eventName: string, eventListenersToSet: Array<EventListenerOrEventListenerObject>): void {

        const eventListeners = ElementEventListenersReflector.getEventListeners(element);
        eventListeners[eventName] = eventListenersToSet;
        ElementEventListenersReflector.setEventListeners(element, eventListeners);
    }
}