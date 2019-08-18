// MUST be imported here
import "reflect-metadata";

import {ComponentImpl, InjectionStrategy} from "../..";
import {InjectionReference} from "../type/InjectionReference";

export function DefaultInjectionStrategy<T extends ComponentImpl<any>>(injectionStrategy: InjectionStrategy, injectionReference?: InjectionReference): T|any {


        return (target: T) => {
            console.log('DefaultInjectionStrategy', injectionStrategy, target);
            return target;
        }


}

