export interface StatefulLifecycle<S> {
    onStoreStateChange?(state: S): void;
    state?: S;
}