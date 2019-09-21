import { st } from "../../../src/core";
import { tsx } from "../../../src/web";
import { customElement } from "../../../src/web/customelement";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill";
import { ref } from "../../../src/web/vdom/decorator/ref";

if (process.env.NODE_ENV === "development") {
	customElementsHMRPolyfill;
}

@customElement("ref-test")
export class RefTest extends st.customElement {
	time: number = 0;

	@ref("someDiv")
	someDiv!: HTMLDivElement;

	onGetDiv = () => {
		console.log("get div", st.getRef("someDiv", this), this.someDiv);

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
