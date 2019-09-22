export const SET_REF_NAME = Symbol("SET_REF_NAME");
export const SET_REF_PROP_NAME = Symbol("SET_REF_PROP_NAME");
export const SET_REF_VALUE = Symbol("SET_REF_VALUE");

export const domRef = (refName: string): any => {
	return (instance: any, propName: string) => {
		if (!instance[SET_REF_NAME]) {
			instance[SET_REF_NAME] = [];
			instance[SET_REF_VALUE] = [];
			instance[SET_REF_PROP_NAME] = [];
		}
		instance[SET_REF_NAME].push(refName);
		instance[SET_REF_PROP_NAME].push(propName);
	};
};
