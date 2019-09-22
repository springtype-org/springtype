import { st } from "../../../src/core";
import { customElement } from "../../../src/web/customelement";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill/custom-elements-hmr-polyfill";
import { domRef, tsx } from "../../../src/web/vdom";

if (process.env.NODE_ENV === "development") {
	customElementsHMRPolyfill;
}

@customElement("ref-test")
export class RefTest extends st.customElement {
	time: number = 0;

	@domRef("someDiv")
	someDiv!: HTMLDivElement;

	onGetDiv = () => {
		console.log("get div", st.getDomRef("someDiv", this), this.someDiv);

		this.time = Date.now();

		this.reflow();
	};

	render() {
		return (
			<div>
				<button onClick={this.onGetDiv}>Get DIV</button>
				<div ref={{ someDiv: this }}>{this.time}</div>
			</div>
		);
	}

	renderStyle() {
		return {
			div: {
				background: "#cc0000"
			}
		};
	}
}

document.body.innerHTML = "<ref-test></ref-test>";
