import { st } from "../st/st";
import { InjectionStrategy } from "./enum/injection-strategy";
import { IInjectionStrategyConfig } from "./interface/iinjection-strategy-config";

export const INJECTION_STRATEGY = "INJECTION_STRATEGY";

// for st.enable(di, ...)
export const di = null;

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
	};

	// assign functional API
	st.inject = st.di.get;
} else {
  if (process.env.NODE_ENV === 'development') {
    st.warn('Module di is loaded twice. Check for duplicate famework import!');
  }
}
