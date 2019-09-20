import { st } from "../../../src/core";
import { tsx } from "../../../src/web";
import { CustomElement, ILifecycle } from "../../../src/web/customelement";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill";

if (process.env.NODE_ENV === "development") {
	customElementsHMRPolyfill;
}

@CustomElement("ref-test")
export class RefTest extends HTMLElement implements ILifecycle {
	time: number = 0;

	onGetDiv = () => {
		console.log("get div", st.getRef("someDiv", this));

		this.time = Date.now();

		this.render();
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
