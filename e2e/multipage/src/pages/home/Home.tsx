import { st } from "../../../../../src/core";
import { customElement } from "../../../../../src/web/customelement";
import { tsx } from "../../../../../src/web/vdom";

@customElement("homepage-root")
export class HomePage extends st.element {
  static ROUTE = "";

  render() {
    return (
      <div>
        HomePage <br />
        {/* manually typed link, also no API used for routing */}
        <a href="/#/blog/">Blog</a>
      </div>
    );
  }

  onConnect() {
    console.log("onConnect HomePage");
    setTimeout(() => {
      st.router.refresh();
    }, 1500);
  }

  renderStyle() {
    return {
      div: {
        background: "red",
      },
    };
  }
}
