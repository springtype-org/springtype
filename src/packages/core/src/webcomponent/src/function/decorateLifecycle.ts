const ST_LIFECYCLE = 'LIFECYCLE';

export interface StLifecycleModel {
    fun: (...args: any) => any;
    value: any;
}

export interface OnLifecycleModel {
    context: any;
    type: LifecycleAfterType| LifecycleBeforeType;
    arguments?: Array<any>
    guard?: (lifecycle: StLifecycleModel) => boolean;
}

export enum LifecycleAfterType {
    ON_AFTER_FLOW = 'ON_AFTER_FLOW',
    ON_AFTER_RENDER = 'ON_AFTER_RENDER',
    ON_AFTER_CONNECT = 'ON_AFTER_CONNECT',
    ON_AFTER_ATTRIBUTE_CHANGE = 'ON_AFTER_ATTRIBUTE_CHANGE',
}

export enum LifecycleBeforeType {
    ON_BEFORE_FLOW = 'ON_BEFORE_FLOW',
    ON_BEFORE_RENDER = 'ON_BEFORE_RENDER',
    ON_BEFORE_CONNECT = 'ON_BEFORE_CONNECT',
    ON_BEFORE_ATTRIBUTE_CHANGE = 'ON_BEFORE_ATTRIBUTE_CHANGE',
}

const getLifecycle = (instance: any): { [key: string]: StLifecycleModel[] } =>
    Reflect.get(instance, ST_LIFECYCLE) || {};

const getLifecycleByType = (instance: any, lifecycleType: LifecycleBeforeType | LifecycleAfterType): StLifecycleModel[] => {
    const lifecycle = getLifecycle(instance);
    return lifecycle[lifecycleType] || [];
};

export const onBeforeLifecycle = (instance: any, onLifecycleModel: OnLifecycleModel): boolean => {
    const onBeforeLifecycle = getLifecycleByType(instance, onLifecycleModel.type);
    for (let i = 0; i < onBeforeLifecycle.length; i++) {
        const lifecycle = onBeforeLifecycle[i];
        let guard = onLifecycleModel.guard;
        if(!guard){
            guard = () => true;
        }
        if (guard(lifecycle)) {
            if (lifecycle.fun.call(onLifecycleModel.context, onLifecycleModel.arguments) === true) {
                return true;
            }
        }
    }
    return false;
};

export const onAfterLifecycle = (instance: any, onLifecycleModel: OnLifecycleModel): void => {
    const onAfterType = getLifecycleByType(instance, onLifecycleModel.type);
    for (let i = 0; i < onAfterType.length; i++) {
        const lifecycle = onAfterType[i];
        let guard = onLifecycleModel.guard;
        if(!guard){
            guard = () => true;
        }
        if (guard(lifecycle)) {
            lifecycle.fun.call(onLifecycleModel.context, onLifecycleModel.arguments);
        }
    }
};

const setStLifecycle = (instance: any, lifecycle: { [key: string]: StLifecycleModel[] }) =>
    Reflect.set(instance, ST_LIFECYCLE, lifecycle);

export const decorateLifecycle = (instance: any, lifecycleType: LifecycleBeforeType | LifecycleAfterType, decoratorValue: any, descriptor: PropertyDescriptor) => {
    const lifecycle = getLifecycle(instance);
    const decorateLifecycle = lifecycle[lifecycleType] || [];
    decorateLifecycle.push({fun: descriptor.value, value: decoratorValue});
    lifecycle[lifecycleType] = decorateLifecycle;
    setStLifecycle(instance, lifecycle);
};
