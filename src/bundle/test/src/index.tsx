import { st } from "../../../core";
import { attr, customElement } from "../../../web/customelement";
import { tsx } from "../../../web/vdom";
import * as style from "./style.css";

st.debug = true;

@customElement("st-bundle-test")
class Test extends st.element {
  @attr
  foo: string = "bar";

  styleText: string = "";

  env?: string = "development";

  constructor() {
    super();

    this.env = process.env.NODE_ENV;

    this.testStylesheet();
  }

  async testStylesheet() {
    this.styleText = await style;
    this.doRender();
  }

  render() {
    return (
      <div>
        <div id="testOK">Test OK</div>
        <p id="styleText">{this.styleText}</p>
        <p id="attr">{this.foo}</p>
        <p id="env">{this.env}</p>
      </div>
    );
  }
}
st.render(Test, {
  foo: "bar-test",
});
