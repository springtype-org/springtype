import { st } from "../../../../src/core/st";
import { attr, customElement, state } from "../../../../src/web/customelement";
import { adoptStylesheet } from "../../../../src/web/tss";
import tss from "./mwc-top-bar-override.tss";
import tpl from "./mwc-top-bar.tpl";
export type VariantType = false | "fixed" | "prominent" | "fixed-prominent" | "short" | "fixed-short";

// TODO: MwcIcon class?
@adoptStylesheet("@import url(https://fonts.googleapis.com/icon?family=Material+Icons)", "mdc-icons")
@adoptStylesheet(import("@material/top-app-bar/dist/mdc.top-app-bar.css"), "mdc-top-app-bar")
@adoptStylesheet(import("@material/icon-button/dist/mdc.icon-button.css"), "mdc-icon-button")
@customElement("mwc-top-bar", {
  tpl,
  tss,
})
export class MwcTopBar extends st.element {
  @attr
  "mwc-dense": boolean = false;

  @attr
  "mwc-title": string = "";

  @attr
  "mwc-variant": VariantType = false;

  @attr
  "menu-open": boolean = false;

  @attr
  "mwc-scrolled": boolean = false;

  @state
  prop: { offsetWidth: number } = { offsetWidth: 0 };
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "mwc-top-bar": Partial<MwcTopBar>;
    }
  }
}
