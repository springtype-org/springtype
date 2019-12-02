import { st } from "../../../../../../src/core";
import { component } from "../../../../../../src/web/component";
import { tsx } from "../../../../../../src/web/vdom";
import { ILifecycle } from "../../../../../../src/web/component/interface";

interface BlogPostParams {
  id: number;
}

@component
export class PageContent extends st.component implements ILifecycle {
  static ROUTE = "blog/firstpost/:id/";

  onRouteParamsChanged(params: BlogPostParams) {
    console.log('Route param changed', params.id);
  }

  render() {
    return (
      <div>
        FirstPostPage, id: {st.route.params!.id} rnd: {Math.random()}
        <br />
        <a
          href="javascript:void(0)"
          onClick={() => {
            st.route = {
              path: "home",
            };
          }}
        >
          Back Home
        </a>
      </div>
    );
  }


  onRouteEnter() {
    console.log('PageContent enter')
  }

  onRouteLeave() {
    console.log('PageContent leave')
  }
}
