import { st } from "../st/ST";
import { InjectionStrategy } from "./enum/InjectionStrategy";
import { IDI } from "./interface/IDI";
import { IInjectionStrategyConfig } from "./interface/IInjectionStrategyConfig";

export const INJECTION_STRATEGY = Symbol("INJECTION_STRATEGY");

if (!st.di) {
	st.di = {
		singletonInstanceRegistry: {},

		/**
		 * Instantiates a class while taking care of DI configuration
		 */
		newInstance: (factoryFn: any, injectionStrategy: InjectionStrategy) => {
			const newInstance = factoryFn();

			if (injectionStrategy == InjectionStrategy.SINGLETON) {
				st.di.singletonInstanceRegistry[
					newInstance.constructor.name
				] = newInstance;
			}
			return newInstance;
		},

		defaultFactoryFn: (ctor: any) => () => new ctor(),

		/**
		 * Returns an instance as SINGLETON or FACTORY
		 * @param originalCtor Constructor of the class to inject
		 */
		get: (originalCtor: any) => {
			if (!originalCtor || !originalCtor[INJECTION_STRATEGY]) return;

			const {
				injectionStrategy,
				factoryFn
			}: IInjectionStrategyConfig = originalCtor[INJECTION_STRATEGY];

			let instance: any;

			if (
				injectionStrategy === InjectionStrategy.SINGLETON &&
				st.di.singletonInstanceRegistry[originalCtor.name]
			) {
				instance = st.di.singletonInstanceRegistry[originalCtor.name];
			} else {
				instance = st.di.newInstance(
					factoryFn || st.di.defaultFactoryFn(originalCtor),
					injectionStrategy
				);
			}
			return instance;
		}
	} as IDI;
}
