import { st } from "../../../../../src/core";
import { component, attr } from "../../../../../src/web/component";
import { tsx } from "../../../../../src/web/vdom";
import { PageContent } from "./posts/pagecontent";
import { Route } from "../../../../../src/web/router";

export interface BlogPageAttributes {
  blogPageId?: number;
}

@component
export class BlogPage extends st.component<BlogPageAttributes> implements BlogPageAttributes {
  static ROUTE = "blog";

  @attr
  blogPageId!: number;

  onReRenderClick = () => {
    this.doRender();
  };

  guardFirstPostEntry = async () => {
    console.log('called guard')
    if (Math.random() > 0.5) {
      console.log('trigger PageContent render')
      return <PageContent />;
    }
    return <div>Access denied.</div>;
  };

  render() {
    return (
      <div>
        <button onClickCapture={this.onReRenderClick}>Re-render</button>
        BlogPage {Math.random()}
        <br />
        <a
          href="javascript:void(0)"
          onClick={() =>
            (st.route = {
              path: "home",
            })
          }
        >
          Back Home
        </a>
        <br />
        <a
          href="javascript:void(0)"
          onClick={() => {
            st.route = {
              path: PageContent.ROUTE,
              params: {
                id: this.blogPageId,
              },
            };
          }}
        >
          Show post with id provided
        </a>
        <h3>Blog post:</h3>
        <Route
          path={PageContent.ROUTE}
          guard={this.guardFirstPostEntry}
        />
      </div>
    );
  }
}
