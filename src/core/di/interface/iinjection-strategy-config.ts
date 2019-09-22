import { InjectionStrategy } from "../enum/injection-strategy";

export interface IInjectionStrategyConfig {
	injectionStrategy: InjectionStrategy;
	factoryFn?: Function;
}
