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
	node: Node
) => {
	const index = componentInstance[SET_REF_NAME].indexOf(refName);

	// instance asks for @Ref
	if (index > -1) {
		const propName = componentInstance[SET_REF_PROP_NAME][index];

		// set property of instance's value
		componentInstance[propName] = node;

		// set value at index for fast index lookup using st.getRef()
		componentInstance[SET_REF_VALUE][index] = node;
	}
};

if (!st.getDomRef) {
	st.getDomRef = getDomRef;
	st.setDomRef = setDomRef;
}
