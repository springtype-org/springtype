import { InjectionStrategy } from "../enum/InjectionStrategy";

export interface IDI {
	singletonInstanceRegistry: any;

	newInstance(ctor: any, injectionStrategy: InjectionStrategy): any;

	get(targetClass: any): any;

	defaultFactoryFn(ctor: any): any;
}
