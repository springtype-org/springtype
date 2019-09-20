import "reflect-metadata";
import { st } from "../st/ST";
import { InjectionStrategy } from "./enum/InjectionStrategy";
import { IDI } from "./interface/IDI";

export interface InjectionStrategyConfig {
	injectionStrategy: InjectionStrategy;
	factoryFn?: Function;
}

export const CLASS_NAME = "CLASS_NAME";
export const INJECTION_STRATEGY = Symbol("INJECTION_STRATEGY");
export const INJECTIONS: any = Symbol("INJECTIONS");

export class DI implements IDI {
	singletonInstanceRegistry: any = {};

	static init() {
		if (!st.di) {
			st.di = new DI();

			// allows for the injection of the DI
			st.di.setClassName(DI, DI.name);
			st.di.registerSingletonInstance(st.di);
			st.di.setInjectionStrategyConfig(DI, InjectionStrategy.SINGLETON);
		}
	}

	static createDerivedInjectableClass(
		originalCtor: any,
		injectionStrategy: InjectionStrategy = InjectionStrategy.SINGLETON,
		factoryFn?: Function
	): any {
		const injectableClass = class extends originalCtor {
			constructor() {
				super(
					...st.di.getInjectionsForArguments(
						originalCtor,
						arguments,
						Reflect.getMetadata("design:paramtypes", injectableClass) || []
					)
				);
				st.di.callOnContextChangeOfInjectionInstanceRefs(injectableClass, this);
			}
		};

		st.di.setClassName(injectableClass, originalCtor.name);
		st.di.setInjectionStrategyConfig(
			injectableClass,
			injectionStrategy,
			factoryFn
		);
		return injectableClass;
	}

	setClassName(targetClass: any, originalName: string) {
		Object.defineProperty(targetClass, CLASS_NAME, {
			value: originalName
		});
	}

	setInjectionStrategyConfig(
		targetClass: any,
		injectionStrategy: InjectionStrategy,
		factoryFn?: Function
	) {
		Object.defineProperty(targetClass, INJECTION_STRATEGY, {
			value: {
				injectionStrategy,
				factoryFn
			}
		});
	}

	getInjectionStrategyConfig(targetClass: any): InjectionStrategyConfig {
		return targetClass[INJECTION_STRATEGY];
	}

	getClassName(targetClass: any): string {
		return targetClass[CLASS_NAME];
	}

	newInstance(ctor: any, injectionStrategy: InjectionStrategy): any {
		const newInstance = new ctor(
			...st.di.getInjectionsForArguments(
				ctor,
				[],
				Reflect.getMetadata("design:paramtypes", ctor) || []
			)
		);

		if (injectionStrategy == InjectionStrategy.SINGLETON) {
			st.di.registerSingletonInstance(newInstance);
		}
		return newInstance;
	}

	registerSingletonInstance(instance: any) {
		st.di.singletonInstanceRegistry[
			instance.constructor[CLASS_NAME]
		] = instance;
	}

	addInjectionInstanceRef(ctor: any, injection: any) {
		if (!ctor[INJECTIONS]) {
			ctor[INJECTIONS] = [];
		}
		ctor[INJECTIONS].push(injection);
	}

	callOnContextChangeOfInjectionInstanceRefs(ctor: any, context: any) {
		if (!ctor[INJECTIONS]) return;

		for (let i = 0; i < ctor[INJECTIONS].length; i++) {
			if (typeof ctor[INJECTIONS][i]["onContextChange"] == "function") {
				ctor[INJECTIONS][i]["onContextChange"](context);
			}
		}
	}

	get(originalCtor: any) {
		return st.di.getInjectionsForArguments(
			originalCtor,
			[undefined],
			[originalCtor]
		)[0];
	}

	getInjectionsForArguments(
		originalCtor: any,
		argumentValues: Array<any>,
		reflectedArgumentTypes: Array<any>
	): Array<any> {
		const injectedArguments: Array<any> = [];

		for (let i = 0; i < reflectedArgumentTypes.length; i++) {
			if (!reflectedArgumentTypes[i]) continue;

			// check of @Injectable had been added to the class to inject
			const isAnInjectableClass = !!st.di.getClassName(
				reflectedArgumentTypes[i]
			);

			const injectionStrategyConfig = st.di.getInjectionStrategyConfig(
				reflectedArgumentTypes[i]
			);

			if (
				isAnInjectableClass &&
				injectionStrategyConfig &&
				injectionStrategyConfig.injectionStrategy === InjectionStrategy.FACTORY
			) {
				// always create a new instance in case of factory
				if (typeof injectionStrategyConfig.factoryFn == "function") {
					injectedArguments[i] = injectionStrategyConfig.factoryFn();
				} else {
					injectedArguments[i] = st.di.newInstance(
						reflectedArgumentTypes[i],
						injectionStrategyConfig.injectionStrategy
					);
				}
				st.di.addInjectionInstanceRef(originalCtor, injectedArguments[i]);
			}

			// defaults to InjectionStrategy.SINGLETON from here on:
			else if (
				isAnInjectableClass &&
				st.di.singletonInstanceRegistry[CLASS_NAME]
			) {
				// if there is an instance already stored,
				// re-use this instance (singleton injection strategy)
				injectedArguments[i] = st.di.singletonInstanceRegistry[CLASS_NAME];
			} else if (isAnInjectableClass) {
				// if there is no singleton instance stored in the instance registry alreafy
				// but the class is @Injectable, create a new instance
				injectedArguments[i] = st.di.newInstance(
					reflectedArgumentTypes[i],
					injectionStrategyConfig.injectionStrategy
				);
				st.di.addInjectionInstanceRef(originalCtor, injectedArguments[i]);
			} else {
				// otherwise the argument is not injectable, try to use the
				// original argument value if available
				injectedArguments[i] = argumentValues[i] || undefined;
			}
		}
		return injectedArguments;
	}
}
DI.init();
