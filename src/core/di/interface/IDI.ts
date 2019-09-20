import { InjectionStrategyConfig } from "../DI";
import { InjectionStrategy } from "../enum/InjectionStrategy";

export interface IDI {
	singletonInstanceRegistry: any;
	registerSingletonInstance(instance: any): void;
	getInjectionsForArguments(
		originalCtor: any,
		argumentValues: any,
		reflectedArgumentTypes: Array<any>
	): Array<any>;
	newInstance(ctor: any, injectionStrategy: InjectionStrategy): any;

	setClassName(targetClass: any, originalName: string): void;
	getClassName(targetClass: any): string;

	get(targetClass: any): any;
	setInjectionStrategyConfig(
		targetClass: any,
		injectionStrategy: InjectionStrategy,
		factoryFn?: Function
	): void;
	getInjectionStrategyConfig(targetClass: any): InjectionStrategyConfig;

	addInjectionInstanceRef(ctor: any, injection: any): void;
	callOnContextChangeOfInjectionInstanceRefs(ctor: any, context: any): void;
}
