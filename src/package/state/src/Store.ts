import {ApplicationContext, Component} from "../../di";
import * as R from "@rematch/core";
import * as Redux from 'redux'

@Component
export class Store<S> {

    private _nativeStore!: R.RematchStore;

    get nativeStore(): R.RematchStore {
        if (this._nativeStore) return this._nativeStore;
        return this._nativeStore = <R.RematchStore> ApplicationContext.getInstance().getWebAppConfig().store;
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