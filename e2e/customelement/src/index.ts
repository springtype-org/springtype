import { DI, getShare, I18n, log, Share, st, Use } from "../../../src/core";
import {
	Attribute,
	CustomElement,
	customElementsHMRPolyfill,
	ILifecycle,
	Lifecycle,
	Router,
	State,
	Store,
	TSS
} from "../../../src/web";
import { Foo2 } from "./component";
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
@Use(Foo2)
export class Foo extends HTMLElement implements ILifecycle {
	@Attribute()
	some: string = "test";

	@Share("foo")
	lolShared: any = getShare("foo");

	onButtonClick = () => {
		this.lifecycle.render();
	};
	constructor(
		router: Router,
		di: DI,
		i18n: I18n,
		store: Store,
		state: State,
		private lifecycle: Lifecycle,
		protected tss: TSS
	) {
		super();

		console.log("foo st", st);

		i18n.setLanguage("en");

		setTimeout(() => {
			log(
				"router",
				router,
				"di",
				di,
				"i18n",
				i18n,
				"store",
				store,
				"state",
				state,
				"tss",
				tss
			);
		}, 200);
	}

	onPropChange(change: any) {
		console.log("1PROP change", change);
	}

	onConnect() {
		log("to be executed on connect", this.lifecycle);
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
