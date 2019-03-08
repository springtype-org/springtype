import {Store} from "./Store";
import {ApplicationContext} from "../../di";

export const connectComponent = (instance: any, onStateChange?: (state: any) => void) => {

    const store: Store<any> = ApplicationContext.getInstance().getBean(Store);

    // set the state object
    Object.defineProperty(instance, 'state', {
        get: () => store.getState()
    });

    store.subscribe(() => {

        if (onStateChange && typeof onStateChange === 'function') {
            onStateChange(store.getState());
        }

        if (instance.onStoreStateChange && typeof instance.onStoreStateChange === 'function') {
            instance.onStoreStateChange(store.getState());
        }
    });
    return store;
};