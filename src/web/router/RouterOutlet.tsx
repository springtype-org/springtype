import { tsx } from "..";
import { Attribute, CustomElement } from "../customelement";
import { IVirtualNode } from "../vdom/interface/IVirtualNode";
import { LocationChangeDecision } from "./interface/IRouter";
import { Router } from "./Router";

@CustomElement("router-outlet")
export class RouterOutlet extends HTMLElement {
	locationChangeDecision: LocationChangeDecision | null = null;

	@Attribute()
	element: IVirtualNode | null = null;

	constructor(protected router: Router) {
		super();
		this.router.registerRouterOutlet(this);
		this.router.enable();
	}

	refresh() {
		this.element = null; // chance reference to trigger re-flow
		this.element = this.locationChangeDecision!.element;
	}

	present(locationChangeDecision: LocationChangeDecision): void {
		this.locationChangeDecision = locationChangeDecision;
		this.element = this.locationChangeDecision.element;
	}

	onBeforeRender() {
		this.element = this.locationChangeDecision!.element;
	}

	render() {
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
