import { tsx } from "..";
import { st } from "../../core";
import { Attribute, CustomElement } from "../customelement";
import { SpringElement } from "../customelement/SpringElement";
import { IVirtualNode } from "../vdom/interface/IVirtualNode";
import { LocationChangeDecision } from "./interface/IRouter";

@CustomElement("router-outlet")
export class RouterOutlet extends SpringElement {
	locationChangeDecision: LocationChangeDecision | null = null;

	@Attribute()
	element: IVirtualNode | null = null;

	constructor() {
		super();
		st.router.registerRouterOutlet(this);
		st.router.enable();
	}

	refresh() {
		this.element = null; // chance reference to trigger re-flow
		this.element = this.locationChangeDecision!.element;
	}

	present(locationChangeDecision: LocationChangeDecision): void {
		this.locationChangeDecision = locationChangeDecision;
		this.element = this.locationChangeDecision.element;
	}

	/*
	onBeforeRender() {
		console.log("onBeforeRender");
		this.element = this.locationChangeDecision!.element;
	}
	*/

	render() {
		console.log("render");

		if (this.element) {
			return this.element;
		}

		return (
			<div>{"ERROR (RouterOutlet): No component found for route!"}</div>
		) as IVirtualNode;
	}
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"router-outlet": Partial<RouterOutlet>;
		}
	}
}
