import { st } from "../../../../../dist/core";
import { component } from "../../../../../dist/web/component";
import { Route } from "../../../../../dist/web/router";
import { tsx } from "../../../../../dist/web/vdom";
import { HomePage } from "../home/Home";
import { FirstPostPage } from "./posts/FirstPost";

@component()
export class BlogPage extends st.component {
  static ROUTE = "#/blog";

  onReRenderClick = () => {
    this.doRender();
  };

  guardFirstPostEntry = async () => {
    if (Math.random() > 0.5) {
      return <FirstPostPage />;
    }
    return <div>Access denied.</div>;
  };

  render() {
    return (
      <div>
        {/* funny comment */}
        <button onClick={this.onReRenderClick}>Re-render</button>
        {/* funny comment */}
        BlogPage {Math.random()}
        <br />
        <a href="javascript:void(0)" onClick={() => st.router.navigate(HomePage.ROUTE)}>
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
          Show first post
        </a>
        <h3>Blog post:</h3>
        <Route path={FirstPostPage.ROUTE} guard={this.guardFirstPostEntry} notMatchingComponent={<p>Nothing selected.</p>} />
      </div>
    );
  }
}
