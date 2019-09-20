import { st } from "../../core";
import { IDOMRef, INodeRef } from "./interface/IDOMRef";

export class DOMRef implements IDOMRef {
	map: WeakMap<any, INodeRef> = new WeakMap();

	static init() {
		st.domRef = new DOMRef();
		st.getRef = st.domRef.get;
	}

	get(refName: string, customElementInstance: any): Node {
		const refs = st.domRef.map.get(customElementInstance) || {};
		return refs[refName];
	}

	set(refName: string, customElementInstance: any, node: Node) {
		const refs = st.domRef.map.get(customElementInstance) || {};
		refs[refName] = node;
		st.domRef.map.set(customElementInstance, refs);
	}

	delete(customElementInstance: any) {
		st.domRef.map.delete(customElementInstance);
	}
}
DOMRef.init();
