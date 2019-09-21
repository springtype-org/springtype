import { InjectionStrategy } from "../enum/InjectionStrategy";

export interface IInjectionStrategyConfig {
	injectionStrategy: InjectionStrategy;
	factoryFn?: Function;
}
