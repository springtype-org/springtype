import {ApplicationContext, Component} from "@springtype/core";
import * as R from "@rematch/core";
import * as Redux from 'redux'
import {STORE} from "./constant/STORE";

@Component
export class Store<S> {

    private _nativeStore!: R.RematchStore;

    get nativeStore(): R.RematchStore {
        if (this._nativeStore) return this._nativeStore;
        return this._nativeStore = <R.RematchStore> ApplicationContext.getInstance().get(STORE);
    }

    get name(): string {
        return this.nativeStore.name;
    }

    getState(): S {
        return <S> this.nativeStore.getState();
    }

    subscribe(listenerFn: () => void): Redux.Unsubscribe {
        return this.nativeStore.subscribe(listenerFn);
    }
}