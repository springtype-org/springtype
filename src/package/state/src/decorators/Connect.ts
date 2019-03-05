export interface IStateConnectedObject<CC> extends Function {
    new(...args: any[]): CC;
}

export interface ConnectConfig<CC extends IStateConnectedObject<any>> {}

export const IS_STORE_CONNECTED = Symbol('IS_STORE_CONNECTED');

const registerForConnect = (prototype: any) => {
    Reflect.set(prototype, IS_STORE_CONNECTED,true);
};

export function Connect<CC extends IStateConnectedObject<any>>(classToConnect?: ConnectConfig<CC>|CC): CC|any {

    // called with @Connect() or @Connect({})
    if (!(typeof classToConnect === 'function')) {

        return (target: any) => {
            console.log('connectec HOC @Connect(), storeConnected to store here using store.subscribe()', target);

            registerForConnect(target);
            return target;
        }

    } else {

        console.log('connectec HOC @Connect, storeConnected to store here using store.subscribe()', classToConnect);

        registerForConnect(classToConnect);
        // called with @Connect
        return classToConnect;
    }
}