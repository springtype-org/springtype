// MUST be imported here
import "reflect-metadata";

import {ComponentImpl} from "../interface/ComponentImpl";
import {BeanConfig} from "../interface/BeanConfig";
import {registerBean} from "../function/registerBean";

export function Component<T extends ComponentImpl<any>>(beanConfigOrCtor?: BeanConfig<T>|T): T|any {

    // called with @Component - no beanConfig object
    if (!(typeof beanConfigOrCtor === 'function')) {

        return (target: T) => {
            return registerBean(target, <BeanConfig<T>> beanConfigOrCtor);
        }

    } else {

        // called with @Component() or @Component({ ... })
        return registerBean(<T> beanConfigOrCtor);
    }
}