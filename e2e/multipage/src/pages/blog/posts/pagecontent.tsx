import { st } from "../../../../../../src/core";
import { component } from "../../../../../../src/web/component";
import { tsx } from "../../../../../../src/web/vdom";
import { HomePage } from "../../homepage";

@component
export class PageContent extends st.component {
  static ROUTE = "#/blog/firstpost/:id/";

  render() {
    return (
      <div>
        FirstPostPage, id: {st.route.params!.id}
        <br />
        <a
          href="javascript:void(0)"
          onClick={() => {
            st.route = {
              path: HomePage.ROUTE,
            };
          }}
        >
          Back Home
        </a>
      </div>
    );
  }
}
