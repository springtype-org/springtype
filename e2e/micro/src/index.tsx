import { st } from "../../../src/core";
import { PropChange } from "../../../src/core/cd/interface/OnPropChange";
import { log } from "../../../src/core/log/log";
import { Share } from "../../../src/core/share/decorator/Share";
import { getShare, initShare } from "../../../src/core/share/share";
import { tsx } from "../../../src/web";
import { Attribute, CustomElement } from "../../../src/web/customelement";
import { SpringElement } from "../../../src/web/customelement/SpringElement";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill";

if (process.env.NODE_ENV === "development") {
	customElementsHMRPolyfill;
}

interface LolShared {
	lala: number;

	deep?: boolean;
}

@CustomElement("my-foo")
export class Foo extends SpringElement {
	@Attribute()
	some: string = "test";

	@Share("foo")
	lolShared: LolShared = initShare<LolShared>(
		"foo",
		{ lala: 123 },
		(change: PropChange) => {
			console.log("initShare on prime", this, change);
		},
		this
	);

	@Share("foo")
	lolSharedMirror: LolShared = getShare<LolShared>(
		"foo",
		(change: PropChange) => {
			console.log("getShare on mirror", this, change);
		},
		this
	);

	constructor() {
		super();

		setTimeout(() => {
			log("di", st.di, "i18n");

			// external change (reset of reference)
			this.lolShared = { lala: 456 };

			// external deep change
			this.lolShared.deep = true;
		}, 200);

		setTimeout(() => {
			//document.body.removeChild(document.body.childNodes[0]);
		}, 800);

		setTimeout(() => {
			console.log("GC?");
		}, 10000);
	}

	onDisconnect() {
		console.log("onDisconnect");
	}
	render() {
		return <div>asd</div>;
	}

	renderStyle() {
		return {
			"@font-face": {
				"font-family": "CustomFont",
				src: 'url("CustomFont.eot")'
			},
			"@media (color-index: 16)": {
				body: {
					background: "#000000"
				}
			},
			body: {
				background: "#ff0000"
			}
		};
	}

	shouldRender() {
		return true;
	}
}

document.body.innerHTML = "<my-foo some='haha'></my-foo>";
