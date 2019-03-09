import * as R from "@rematch/core";

export const MODEL = 'MODEL';

export class StateManager {

    static createStore(initConfig: R.InitConfig = {}): R.RematchStore {
        return R.init(initConfig);
    }

    static createModel(stateModel: any, modelConfig: R.ModelConfig<any, any>): any {
        Reflect.set(stateModel, MODEL, R.createModel(modelConfig));
    }

    static getNativeModel(stateModel: any): R.Model {
        return Reflect.get(stateModel, MODEL);
    }
}