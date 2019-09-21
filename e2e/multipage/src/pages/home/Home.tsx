import { CustomElement, tsx } from "../../../../../src/web";
import { SpringElement } from "../../../../../src/web/customelement/SpringElement";

@CustomElement("homepage-root")
export class HomePage extends SpringElement {
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
