import {ApplicationContext, Component} from "../../../di";
import {IS_EFFECT} from "./StateEffect";
import {IS_REDUCER} from "./StateReducer";
import * as R from "@rematch/core";
import {RematchDispatcher} from "@rematch/core";
import {StateManager} from "../StateManager";
import {makeReducerMethodAutoImmutable} from "../function/makeReducerMethodAutoImmutable";

export function StateModel(modelName: string): any {

    return (model: any) => {
        const injectableModel = <any> Component(model);
        const appContext = ApplicationContext.getInstance();
        const modelInstance = appContext.getBean(injectableModel);

        const modelConfig: R.ModelConfig<any> = {
            state: modelInstance.initialState,
            reducers: {},
            effects: {}
        };

        const memberMethods = injectableModel.__proto__.prototype;
        let effectCount = 0;
        let reducerCount = 0;

        for (const methodName in memberMethods) {

            if (memberMethods.hasOwnProperty(methodName) &&
                typeof memberMethods[methodName] === 'function') {

                if (memberMethods[methodName][IS_EFFECT]) {
                    (<any>modelConfig.effects)[methodName] = <RematchDispatcher> memberMethods[methodName];
                    effectCount++;
                }

                if (memberMethods[methodName][IS_REDUCER]) {
                    (<any>modelConfig.reducers)[methodName] = makeReducerMethodAutoImmutable(memberMethods[methodName]);
                    reducerCount++;
                }
            }
        }

        if (!effectCount) {
            console.warn(`@StateModel("${modelName}") has no *effect* methods (e.g. whatever()). Did you forgot to add the @StateEffect decorator?`);
        }

        if (!reducerCount) {
            console.warn(`@StateModel("${modelName}") has no *reducer* methods (e.g. onWhatever()). Did you forgot to add the @StateReducer decorator?`);
        }

        if (reducerCount > effectCount) {
            console.warn(`@StateModel("${modelName}") has more reducers than effects. Please check the method naming.`);
        }

        if (effectCount > reducerCount) {
            console.warn(`@StateModel("${modelName}") has more effects than reducers. Please check the method naming.`);
        }

        const effects: R.ModelEffects<any> = <R.ModelEffects<any>> modelConfig.effects;

        modelConfig.effects = dispatch => {
            modelInstance.reducers = dispatch[modelName];
            return effects;
        };
        StateManager.createModel(injectableModel, modelConfig);

        return injectableModel;
    }
}