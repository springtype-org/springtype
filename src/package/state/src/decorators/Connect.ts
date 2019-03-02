import {BeanConfig} from "../../../di/src/decorator/Component";

export interface IStateConnectedObject<CC> extends Function {
    new(...args: any[]): CC;
}

export interface ConnectConfig<CC extends IStateConnectedObject<any>> {

}

const registerForConnect = (classToConnect: any) => {

    // TODO: Register in Reflect for connect()
};

export function Connect<CC extends IStateConnectedObject<any>>(classToConnect?: ConnectConfig<CC>|CC): CC|any {

    // called with @Connect() or @Connect({})
    if (!(typeof classToConnect === 'function')) {

        return (target: any) => {
            console.log('connectec HOC @Connect(), connect to store here using store.subscribe()', target);

            registerForConnect(target);
            return target;
        }

    } else {

        console.log('connectec HOC @Connect, connect to store here using store.subscribe()', classToConnect);

        registerForConnect(classToConnect);
        // called with @Connect
        return classToConnect;
    }
}