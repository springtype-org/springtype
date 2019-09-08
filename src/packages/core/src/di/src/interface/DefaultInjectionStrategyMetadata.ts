import {InjectionStrategy} from "../enum/InjectionStrategy";
import {InjectionReference} from "../type/InjectionReference";

export interface DefaultInjectionStrategyMetadata {
    injectionReference: InjectionReference;
    injectionStrategy: InjectionStrategy;
}