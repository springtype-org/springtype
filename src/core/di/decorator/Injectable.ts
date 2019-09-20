import { DI } from "../DI";
import { InjectionStrategy } from "../enum/InjectionStrategy";

export const Injectable = (
	injectionStrategy: InjectionStrategy = InjectionStrategy.SINGLETON,
	factoryFn?: Function
) => {
	return (originalCtor: any) => {
		return DI.createDerivedInjectableClass(
			originalCtor,
			injectionStrategy,
			factoryFn
		);
	};
};
