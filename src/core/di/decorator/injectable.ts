import { INJECTION_STRATEGY } from "../di";
import { InjectionStrategy } from "../enum/injection-strategy";
import { IInjectionStrategyConfig } from "../interface/iinjection-strategy-config";

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
