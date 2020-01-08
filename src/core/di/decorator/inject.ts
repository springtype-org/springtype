import { st } from "../../st/st";

export const inject = (ctor: any, constructorArgument?: any): any => {
	return (instance: any, propName: string) => {
		Object.defineProperty(instance, propName, {
			value: st.di.get(ctor, constructorArgument)
		})
	};
};
