import { CustomElement, ILifecycle, tsx } from "../../../../../src/web";

@CustomElement("homepage-root")
export class HomePage extends HTMLElement implements ILifecycle {
	static ROUTE = "";

	render() {
		return (
			<div>
				HomePage <br />
				{/* manually typed link, also no API used for routing */}
				<a href="/#/blog">Blog</a>
			</div>
		);
	}

	renderStyle() {
		return {
			div: {
				background: "red"
			}
		};
	}
}
