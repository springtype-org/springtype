import {ApplicationContext, Component} from "../../../di";
import {IS_EFFECT} from "./StateEffect";
import {IS_REDUCER} from "./StateReducer";
import * as R from "@rematch/core";
import {RematchDispatcher} from "@rematch/core";
import {StateManager} from "../StateManager";

export function StateModel(model: any): any {

    const injectableModel = <any> Component(model);
    const appContext = ApplicationContext.getInstance();
    const modelInstance = appContext.getBean(injectableModel);

    const modelConfig: R.ModelConfig<any> = {
        state: modelInstance.initialState,
        reducers: {},
        effects: {}
    };

    const memberMethods = injectableModel.__proto__.prototype;

    for (const methodName in memberMethods) {

        if (memberMethods.hasOwnProperty(methodName) &&
            typeof memberMethods[methodName] === 'function') {

            if (memberMethods[methodName][IS_EFFECT]) {
                (<any>modelConfig.effects)[methodName] = <RematchDispatcher> memberMethods[methodName];
            }

            if (memberMethods[methodName][IS_REDUCER]) {
                (<any>modelConfig.reducers)[methodName] = memberMethods[methodName];
            }
        }
    }

    const effects: R.ModelEffects<any> = <R.ModelEffects<any>> modelConfig.effects;

    modelConfig.effects = dispatch => {
        modelInstance.effects = dispatch;
        return effects;
    };
    StateManager.createModel(injectableModel, modelConfig);

    return injectableModel;
}