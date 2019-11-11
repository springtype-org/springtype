import { st } from "../../../../../src/core";
import { component } from "../../../../../src/web/component";
import { tsx } from "../../../../../src/web/vdom";

@component()
export class HomePage extends st.component {
  static ROUTE = "/home";

  render() {
    return (
      <div>
        HomePage <br />
        {/* manually typed link, also no API used for routing */}
        <a href="/#/blog/">Blog</a>
      </div>
    );
  }
}
