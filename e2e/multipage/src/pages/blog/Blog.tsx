import { st } from "../../../../../src/core";
import { customElement } from "../../../../../src/web/customelement";
import { tsx } from "../../../../../src/web/vdom";
import { HomePage } from "../home/Home";
import { FirstPostPage } from "./posts/FirstPost";

@customElement()
export class BlogPage extends st.element {
  static ROUTE = "/blog";

  nagivateHome = () => {
    st.router.navigate(HomePage.ROUTE);
  };

  onReRenderClick = () => {
    this.doRender();
  };

  render() {

    console.log('new random');
    return (
      <div>
        {/* funny comment */}
        <button onClick={this.onReRenderClick}>Re-render</button>
        {/* funny comment */}
        BlogPage {Math.random()}
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
