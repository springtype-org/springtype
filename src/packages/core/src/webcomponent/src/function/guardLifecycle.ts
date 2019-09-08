import {StLifecycleModel} from "./decorateLifecycle";

export const GUARD_ATTRIBUTE_CHANGE = (name: string, oldValue: string, newValue: string) => {
    return (lifecycle: StLifecycleModel) => {
        const value: Array<string> = lifecycle.value;
        const _name = value[0];
        const _oldValue = value[1];
        const _newValue = value[2];
        if (_name) {
            if (_name !== name) {
                return false;
            }
        }
        if (_oldValue) {
            if (_oldValue !== oldValue) {
                return false;
            }
        }
        if (_newValue) {
            if (_newValue !== newValue) {
                return false;
            }
        }
        return true;
    }
};

export const GUARD_FLOW = (initial: boolean) => {
    return   (lifecycle: StLifecycleModel) => lifecycle.value === undefined || lifecycle.value === initial;
};
