import { st } from "../../core";
import {
	SET_REF_NAME,
	SET_REF_PROP_NAME,
	SET_REF_VALUE
} from "./decorator/dom-ref";
import { IGetDomRef, ISetDomRef } from "./interface/idom-ref";

export const getDomRef: IGetDomRef = (
	refName: string,
	customElementInstance: any
): Node => {
	const index = customElementInstance[SET_REF_NAME].indexOf(refName);
	return customElementInstance[SET_REF_VALUE][index];
};

export const setDomRef: ISetDomRef = (
	refName: string,
	customElementInstance: any,
	node: Node
) => {
	const index = customElementInstance[SET_REF_NAME].indexOf(refName);

	// instance asks for @Ref
	if (index > -1) {
		const propName = customElementInstance[SET_REF_PROP_NAME][index];

		// set property of instance's value
		customElementInstance[propName] = node;

		// set value at index for fast index lookup using st.getRef()
		customElementInstance[SET_REF_VALUE][index] = node;
	}
};

if (!st.getDomRef) {
	st.getDomRef = getDomRef;
	st.setDomRef = setDomRef;
}
