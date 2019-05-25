import * as Rematch from "@rematch/core";
import {ApplicationContext} from "@springtype/core";
import {STORE} from "./constant/STORE";
import {MODEL} from "./constant/MODEL";
import immerPlugin from "@rematch/immer";

export class StateManager {

    static createStore(storeInitConfig?: Rematch.InitConfig): Rematch.RematchStore {

        if (!storeInitConfig) {
            storeInitConfig = {};
        }

        if (!storeInitConfig.plugins) {
            storeInitConfig.plugins = [];
        }

        // activate "immer"
        storeInitConfig.plugins.push(immerPlugin());

        //console.log('StateManager initConfig', storeInitConfig);

        // TODO: Construct config based on StoreConfig configurable using @Store(storeConfig: StoreConfig)

        const store = Rematch.init(storeInitConfig);
        StateManager.setStore(store);
        return store;
    }

    static setStore(store: Rematch.RematchStore) {
        ApplicationContext.getInstance().set(STORE, store);
    }

    static getStore(): Rematch.RematchStore {
        return ApplicationContext.getInstance().get(STORE);
    }

    static createModel(stateModel: any, modelConfig: Rematch.Model<any, any>): any {
        Reflect.set(stateModel, MODEL, Rematch.createModel(modelConfig));
    }

    static addModel(stateModel: any, modelConfig: Rematch.Model<any, any>): any {

        let store = StateManager.getStore();

        // automatically create singleton store
        if (!store) {
            store = StateManager.createStore();
        }
        store.model(modelConfig);

        Reflect.set(stateModel, MODEL, Rematch.createModel(modelConfig));
    }

    static getNativeModel(stateModel: any): Rematch.Model {
        return Reflect.get(stateModel, MODEL);
    }
}