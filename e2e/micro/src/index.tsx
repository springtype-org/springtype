//import * as globalStyles from "assets/global-styles.css";
import { st } from "../../../dist/core";
import { attr, component } from "../../../dist/web/component";
import { ILifecycle } from "../../../dist/web/component/interface";
import { css } from "../../../dist/web/tss/tss";
import { domRef, tsx } from "../../../dist/web/vdom";

/**
 * A trivial, simple example of a custom element component
 * that comes with a change-detected attribute "some".
 * The example also shows VDOM and TSS template style rendering
 * including the import and use of global CSS stylesheets.
 * Also shows the use of the logging API.
 */
@component()
export class TemplateName extends st.component implements ILifecycle {
  @attr()
  name: string = "SpringType";

  @domRef("nameDiv")
  nameDiv: HTMLDivElement;

  constructor() {
    super();

    console.log('name', this.name);

    // change sets after class property initialization
    this.name = "SpringType v2";

  }

  // attribute changes can be listened to
  onAttributeChange(name: string, value: any) {
    st.info("@attr", name, "changed to", value /*, 'and', globalStyles*/);

  }

  // this method is called only one time after the first render
  onAfterInitialRender() {
    // changes to attributes trigger a re-rendering
    this.name = "SpringType v2: re-rendered";

    // we can easily access native DOM elements with @domRef(...)
    console.log("The DOM element that is re-rendered is:", this.nameDiv);
  }

  // listeners receive the DOM event
  changeName = (evt: MouseEvent) => {
    // we can also use the setAttribute() API
    this.setAttribute("name", "Name changed again and re-rendered!");
  };

  // you could also use @component({ topl }) and import a TSX template function
  render() {
    return (
      <div ref={{ nameDiv: this }}>
        name: {this.name}
        <button onClick={this.changeName}>Change my name</button>
      </div>
    );
  }
}

// Tells SpringType to render this component now
st.render(<TemplateName />);
