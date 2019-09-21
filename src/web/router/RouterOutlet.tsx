import { st } from "../../core";
import { attr, customElement } from "../customelement";
import { IVirtualNode } from "../vdom/interface/IVirtualNode";
import { tsx } from "../vdom/VirtualDOM";
import { ILocationChangeDecision } from "./interface/IRouter";

@customElement("router-outlet")
export class RouterOutlet extends st.customElement {
	locationChangeDecision: ILocationChangeDecision | null = null;

	@attr()
	element: IVirtualNode | null = null;

	constructor() {
		super();
		st.router.registerRouterOutlet(this);
		st.router.enable();
	}

	refresh() {
		this.element = this.locationChangeDecision!.element;
	}

	present(locationChangeDecision: ILocationChangeDecision): void {
		this.locationChangeDecision = locationChangeDecision;
		this.element = this.locationChangeDecision.element;
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
