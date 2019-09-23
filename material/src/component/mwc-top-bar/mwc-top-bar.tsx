import "@material/icon-button/dist/mdc.icon-button.css";
import "@material/top-app-bar/dist/mdc.top-app-bar.css";
import { prop } from "../../../../src/core/cd";
import { st } from "../../../../src/core/st";
import { attr, customElement } from "../../../../src/web/customelement";
import tss from "./mwc-top-bar-override.tss";
import tpl from "./mwc-top-bar.tpl";

export type VariantType =
	| false
	| "fixed"
	| "prominent"
	| "fixed-prominent"
	| "short"
	| "fixed-short";

@customElement("mwc-top-bar", {
	tpl,
	shadowMode: "none",
	tss
})
export class MwcTopBar extends st.element {
	@attr()
	"mwc-dense": boolean = false;

	@attr()
	"mwc-title": string = "";

	@attr()
	"mwc-variant": VariantType = false;

	@attr()
	"menu-open": boolean = false;

	@attr()
	"mwc-scrolled": boolean = false;

	@prop()
	prop: { offsetWidth: number } = { offsetWidth: 0 };
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"mwc-top-bar": Partial<MwcTopBar>;
		}
	}
}
