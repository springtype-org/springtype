import {InjectionStrategy} from "../enum/InjectionStrategy";
import {InjectionReference} from "../type/InjectionReference";

export interface ArgumentInjectionMetadata {
    index: number;
    injectionReference: InjectionReference;
    injectionStrategy: InjectionStrategy;
}