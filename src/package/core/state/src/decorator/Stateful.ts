import {registerForConnect} from "../function/registerForConnect";
import {DEFAULT_STATE_FIELD_NAME} from "../constant/DEFAULT_STATE_FIELD_NAME";

export function Stateful(stateFieldName?: any): any {

    // called with @Stateful() or @Stateful({})
    if (!(typeof stateFieldName === 'function')) {

        return (target: any) => {
            registerForConnect(target, stateFieldName);
            return target;
        }

    } else {

        registerForConnect(stateFieldName, DEFAULT_STATE_FIELD_NAME);

        // called with @Stateful
        return stateFieldName;
    }
}