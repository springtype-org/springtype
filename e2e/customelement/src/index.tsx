import { getShare, log, Share, st } from "../../../src/core";
import {
	Attribute,
	CustomElement,
	customElementsHMRPolyfill
} from "../../../src/web";
import { SpringElement } from "../../../src/web/customelement/SpringElement";
import { tpl } from "./index.tpl";
import { tss } from "./index.tss";

if (process.env.NODE_ENV === "development") {
	customElementsHMRPolyfill;
}

@CustomElement("my-foo", {
	tpl,
	tss,
	shadowMode: "none"
})
export class Foo extends SpringElement {
	@Attribute()
	some: string = "test";

	@Share("foo")
	lolShared: any = getShare("foo");

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
			log(
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
		log("to be executed on connect");
		//this.lifecycle.doRender();

		setTimeout(() => {
			this.some = "haha2";
			//this.lifecycle.render();
			log("re-render after attribute change");
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
