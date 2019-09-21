import { st } from "../../../src/core";
import { tsx } from "../../../src/web";
import { CustomElement } from "../../../src/web/customelement";
import { SpringElement } from "../../../src/web/customelement/SpringElement";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill";
import { Ref } from "../../../src/web/vdom/decorator/Ref";

if (process.env.NODE_ENV === "development") {
	customElementsHMRPolyfill;
}

@CustomElement("ref-test")
export class RefTest extends SpringElement {
	time: number = 0;

	@Ref("someDiv")
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
