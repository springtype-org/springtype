import { st } from "../../../src/core";
import { share } from "../../../src/core/sharedmemory";
import { attr, customElement } from "../../../src/web/customelement";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill/customElementsHMRPolyfill";
import { tpl } from "./index.tpl";
import { tss } from "./index.tss";

if (process.env.NODE_ENV === "development") {
	customElementsHMRPolyfill;
}

@customElement("my-foo", {
	tpl,
	tss,
	shadowMode: "none"
})
export class Foo extends st.customElement {
	@attr()
	some: string = "test";

	@share("foo")
	lolShared: any = st.getShare("foo");

	onButtonClick = () => {
		this.reflow();
	};

	render() {
		console.log("render x");
		return tpl(this);
	}

	constructor() {
		super();

		console.log("foo st", st);

		st.i18n.setLanguage("en");

		setTimeout(() => {
			st.log(
				"router",
				st.router,
				"di",
				st.di,
				"i18n",
				st.i18n,
				"store",
				st.store,
				"state",
				st.state,
				"tss",
				st.tss
			);
		}, 200);
	}

	onPropChange(change: any) {
		console.log("1PROP change", change);
	}

	onConnect(): boolean {
		st.log("to be executed on connect");
		//this.lifecycle.doRender();

		setTimeout(() => {
			this.some = "haha2";
			//this.lifecycle.render();
			st.log("re-render after attribute change");
		}, 1000);

		setTimeout(() => {
			console.log("after 5sec", this.lolShared);
			this.lolShared.lala = 2841823;

			console.log("FINAL1", this.lolShared);
		}, 5000);
		return true;
	}
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"my-foo": Partial<Foo>;
		}
	}
}

document.body.innerHTML = "<my-foo some='haha'></my-foo>";
