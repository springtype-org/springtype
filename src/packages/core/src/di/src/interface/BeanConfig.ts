import {ComponentImpl} from "./ComponentImpl";
import {InjectionStrategy} from "../..";
import {InjectionReference} from "../type/InjectionReference";

export interface BeanConfig<T extends ComponentImpl<any>> {

    // reference to the component that should be used in test
    mockedBy?: T;
    injectionStrategy?: InjectionStrategy;
    injectionReference?: InjectionReference
}