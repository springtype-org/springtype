import { st } from "../../../src/core";
import { translation } from "../../../src/core/i18n";
import { component } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";
import de from "./i18n/de.json";
import en from "./i18n/en.json";
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

st.render(<E2EI18nTest />);
