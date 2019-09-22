import { st } from "../../st/st";

export const inject = (ctor: any): any => {
	return (instance: any, propName: string) => {
		instance[propName] = st.di.get(ctor);
	};
};
