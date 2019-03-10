import {Store} from "../Store";
import {ApplicationContext} from "../../../di";
import {DEFAULT_STATE_FIELD_NAME} from "../constant/DEFAULT_STATE_FIELD_NAME";

export const createStateGetter = (
    instance: any,
    stateFieldName: string = DEFAULT_STATE_FIELD_NAME,
    onStateChange?: (state: any) => void
) => {

    const store: Store<any> = ApplicationContext.getInstance().getBean(Store);

    // set the state object
    Object.defineProperty(instance, stateFieldName, {
        get: () => store.getState()
    });

    // TODO: Unused and refactor to @MapStateToField
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