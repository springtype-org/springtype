import { InjectionStrategy } from "../enum/injection-strategy";

export interface IDI {
	singletonInstanceRegistry: any;

	newInstance(ctor: any, injectionStrategy: InjectionStrategy, constructorArgument?: any): any;

	get(targetClass: any, constructorArgument?: any): any;

	defaultFactoryFn(ctor: any, constructorArgument?: any): any;
}
