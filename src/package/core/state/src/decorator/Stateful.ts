import {registerForConnect} from "../function/registerForConnect";

export function Stateful(classToConnect?: any): any {

    // called with @Stateful() or @Stateful({})
    if (!(typeof classToConnect === 'function')) {

        return (target: any) => {
            registerForConnect(target);
            return target;
        }

    } else {

        registerForConnect(classToConnect);

        // called with @Stateful
        return classToConnect;
    }
}