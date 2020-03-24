import { st } from "../../../src/core";
import { translation } from "../../../src/core/i18n";
import { component } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";
import * as de from "./i18n/de.json";
import * as en from "./i18n/en.json";
import { formatter } from "../../../src/core/formatter";

@formatter("uppercase", value => value.toUpperCase()) // TODO: st.addFormatter()
@translation("de_DE", de) // TODO: st.addTranslation()
@translation("en_US", en) // default locale: en_US
@component
export class E2EI18nTest extends st.component {

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
        <span id="e2e-tr">Key split lookup: {st.t("deep__msg", { someValue: "e2e" })}</span><br />
        <span id="e2e-tr">Key array lookup: {st.t(["deep", "msg"], { someValue: "e2e" })}</span><br />
        <span id="e2e-tr">Key array lookup 2: {st.t(["deep__msg"], { someValue: "e2e" })}</span><br />
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

st.render(<E2EI18nTest />);
