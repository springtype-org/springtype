import { st } from "../../st/ST";

export function Inject(ctor: any): any {
	return (instance: any, propName: string) => {
		instance[propName] = st.di.get(ctor);
	};
}
