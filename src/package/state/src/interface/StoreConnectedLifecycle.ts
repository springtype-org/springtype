export interface StoreConnectedLifecycle<S> {
    onStateChange(state: S): void;
}