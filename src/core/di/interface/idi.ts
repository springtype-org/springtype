import { InjectionStrategy } from "../enum/injection-strategy";

export interface IDI {
	singletonInstanceRegistry: any;

	newInstance(ctor: any, injectionStrategy: InjectionStrategy): any;

	get(targetClass: any): any;

	defaultFactoryFn(ctor: any): any;
}
