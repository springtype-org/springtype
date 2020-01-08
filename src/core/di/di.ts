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
		newInstance: (factoryFn: any, injectionStrategy: InjectionStrategy, constructorArgument?: any) => {
			const newInstance = factoryFn(constructorArgument);

			if (injectionStrategy == InjectionStrategy.SINGLETON) {
				st.di.singletonInstanceRegistry[
					newInstance.constructor.name
				] = newInstance;
			}
			return newInstance;
		},

		defaultFactoryFn: (ctor: any, constructorArgument?: any) => () => new ctor(constructorArgument),

		/**
		 * Returns an instance as SINGLETON or FACTORY
		 * @param originalCtor Constructor of the class to inject
		 * @param constructorArgument Arbitrary first constructor argument for instantiation
		 */
		get: (originalCtor: any, constructorArgument?: any) => {
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
					factoryFn || st.di.defaultFactoryFn(originalCtor, constructorArgument),
					injectionStrategy,
					constructorArgument
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
