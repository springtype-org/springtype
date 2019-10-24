import { st } from "../../../src/core";
import { formatter, translation } from "../../../src/core/i18n";
import { customElement } from "../../../src/web/customelement";
import { tsx } from "../../../src/web/vdom";
// @ts-ignore JSON module import activated in bundler config
import * as de from "./i18n/de.json";
// @ts-ignore JSON module import activated in bundler config
import * as en from "./i18n/en.json";

@formatter("uppercase", value => value.toUpperCase())
@translation("de_DE", de)
@translation("en_US", en) // default locale
@customElement()
export class E2Ei18n extends st.element {
  setGerman = () => {
    st.i18n.setLanguage("de_DE");
    this.doRender();
  };

  setEnglish = () => {
    st.i18n.setLanguage("en_US");
    this.doRender();
  };

  render() {
    return (
      <div>
        <span id="e2e-tr">{st.t("deep.msg", { someValue: "e2e" })}</span>
        <button id="german" onClick={this.setGerman}>
          {st.t("German")}
        </button>
        <button id="english" onClick={this.setEnglish}>
          {st.t("English")}
        </button>
      </div>
    );
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      E2Ei18n: Partial<E2Ei18n>;
    }
  }
}

st.render(<E2Ei18n />);
