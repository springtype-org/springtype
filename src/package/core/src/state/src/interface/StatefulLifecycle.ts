export interface StatefulLifecycle {
    onStoreStateChange?(state: any): void;
    state?: any;
}