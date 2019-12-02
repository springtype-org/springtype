import { st } from "../../../../src/core";
import { component } from "../../../../src/web/component";
import { tsx } from "../../../../src/web/vdom";
import { IElement } from "../../../../src/web/vdom/interface";

@component
export class HomePage extends st.component {
  static ROUTE = "home";

  id = "home_123"
  class = ["foo"]
  style = {
    backgroundColor: "red",
    display: "block",
  }

  constructor() {
    super();

    console.log('HomePage construct')
  }

  onAfterElCreate(el: IElement) {

    console.log("onAfterElCreate", el, "this.class did onBeforeElCreate transform work?", this.class);

    this.setAttribute('id', 'ads');
    this.setAttribute('tabIndex', 1);
  }

  render() {
    // construct children for this.el
    return (
      <div>
        HomePage <br />
        {/* manually typed link, also no API used for routing */}
        <a href="#/blog/">Blog</a>
      </div>
    );
  }

  onAfterInitialRender() {
    console.log('Homepage initial render', this.el)
  }
}
