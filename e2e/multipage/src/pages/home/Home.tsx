import { st } from "../../../../../src/core";
import { component } from "../../../../../src/web/component";
import { tsx } from "../../../../../src/web/vdom";

@component()
export class HomePage extends st.component {
  static ROUTE = "/home";

  render() {

    // set classes on this.el
    this.class = ['foo'];

    // set attributes on this.el
    this.attrs = {
      tabindex: 1
    };

    // construct children for this.el
    return (
      <div>
        HomePage <br />
        {/* manually typed link, also no API used for routing */}
        <a href="/#/blog/">Blog</a>
      </div>
    );
  }
}
