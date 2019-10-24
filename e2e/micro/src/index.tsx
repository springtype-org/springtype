import { st } from "../../../src/core";
import { attr, customElement } from "../../../src/web/customelement";
import { ILifecycle } from "../../../src/web/customelement/interface";
import { css } from "../../../src/web/tss/tss";
import { tsx } from "../../../src/web/vdom";
// imports a global CSS stylesheet
import '../assets/globalStyles.css';

/**
 * A trivial, simple example of a custom element component
 * that comes with a change-detected attribute "some".
 * The example also shows VDOM and TSS template style rendering
 * including the import and use of global CSS stylesheets.
 * Also shows the use of the logging API.
 */
@customElement()
export class Foo extends st.element implements ILifecycle {

  @attr()
  some: string = "test";

  constructor() {
    super();

    // change sets after class property initialization
    this.some = "construct";
  }

  onAttributeChange(name: string, value: any) {
    st.info("@attr", name, "changed to", value);
  }

  onAfterInitialRender() {
    // change triggers a re-rendering
    this.some = "after_initial_render";
  }

  render() {
    return <div>{this.some}</div>;
  }

  renderStyle = () => css`
    @font-face {
      font-family: CustomFont;
      src: url("CustomFont.eot");
    }

    @media (color-index: 16) {
      body {
        background: #000000;
      }
    }

    body {
      background: #ff0000;
    }
  `;
}

// Tells SpringType to render the component now
st.render(<Foo />);
