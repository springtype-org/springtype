import { st } from "../../../../../src/core";
import { customElement } from "../../../../../src/web/customelement";
import { tsx } from "../../../../../src/web/vdom";
import { HomePage } from "../home/Home";
import { FirstPostPage } from "./posts/FirstPost";

@customElement("blogpage-root")
export class BlogPage extends st.element {
  static ROUTE = "/blog";

  nagivateHome = () => {
    st.router.navigate(HomePage.ROUTE);
  };

  render() {
    return (
      <div>
        BlogPage
        <br />
        <a href="javascript:void(0)" onClick={this.nagivateHome}>
          Back Home
        </a>
        <br />
        <a
          href="javascript:void(0)"
          onClick={() => {
            st.router.navigate(FirstPostPage.ROUTE, {
              id: 7,
            });
          }}
        >
          To first post
        </a>
      </div>
    );
  }
}
