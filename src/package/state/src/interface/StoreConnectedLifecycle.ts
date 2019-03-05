export interface StoreConnectedLifecycle<S> {
    onStoreStateChange(state: S): void;
}