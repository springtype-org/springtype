export interface StateModelLifecycle<S, R> {
    initialState: S;
    reducers: R;
}