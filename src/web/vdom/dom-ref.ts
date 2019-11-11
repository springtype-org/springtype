import { st } from "../../core";
import { SET_REF_NAME, SET_REF_PROP_NAME, SET_REF_VALUE } from "./decorator/dom-ref";
import { IGetDomRef, ISetDomRef } from "./interface/idom-ref";

export const getDomRef: IGetDomRef = (
	refName: string,
	componentInstance: any
): Node => {
	const index = componentInstance[SET_REF_NAME].indexOf(refName);
	return componentInstance[SET_REF_VALUE][index];
};

export const setDomRef: ISetDomRef = (
	refName: string,
	componentInstance: any,
	node: any
) => {
	const index = componentInstance[SET_REF_NAME].indexOf(refName);

	// if we injected a component, reference the component, not the pure DOM node
	const nodeValue = node.$stComponent ? node.$stComponent : node

	// instance asks for @Ref
	if (index > -1) {
		const propName = componentInstance[SET_REF_PROP_NAME][index];

		// set property of instance's value
		componentInstance[propName] = nodeValue;

		// set value at index for fast index lookup using st.getRef()
		componentInstance[SET_REF_VALUE][index] = nodeValue;
	}
};

if (!st.getDomRef) {
	st.getDomRef = getDomRef;
	st.setDomRef = setDomRef;
}
