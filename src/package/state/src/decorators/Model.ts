import {ApplicationContext, Component} from "../../../di";
import {IS_EFFECT} from "./Effect";
import {IS_REDUCER} from "./Reducer";
import * as R from "@rematch/core";
import {RematchDispatcher} from "@rematch/core";
import {StateManager} from "../StateManager";

export function Model(model: any): any {

    const injectableModel = <any> Component(model);
    const appContext = ApplicationContext.getInstance();

    const modelInstance = appContext.getBean(injectableModel);

    const modelConfig: R.ModelConfig<any> = {
        state: modelInstance.state,
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
        modelInstance.dispatch = dispatch;
        return effects;
    };
    StateManager.createModel(injectableModel, modelConfig);

    return injectableModel;
}