import * as Rematch from "@rematch/core";
import {ApplicationContext} from "../../di";
import {STORE} from "./constant/STORE";
import {MODEL} from "./constant/MODEL";

export class StateManager {

    static createStore(storeInitConfig?: Rematch.InitConfig): Rematch.RematchStore {

        // TODO: Allow to provide Store config?
        //console.log('StateManager initConfig', storeInitConfig);

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