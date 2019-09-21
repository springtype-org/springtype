import { INJECTION_STRATEGY } from "../DI";
import { InjectionStrategy } from "../enum/InjectionStrategy";
import { IInjectionStrategyConfig } from "../interface/IInjectionStrategyConfig";

export const injectable = (
	injectionStrategy: InjectionStrategy = InjectionStrategy.SINGLETON,
	factoryFn?: Function
) => {
	return (originalCtor: any) => {
		Object.defineProperty(originalCtor, INJECTION_STRATEGY, {
			value: {
				injectionStrategy,
				factoryFn
			} as IInjectionStrategyConfig
		});
		return originalCtor;
	};
};
