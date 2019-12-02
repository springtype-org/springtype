import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";
import { RouteList, Route, PATH_START, PATH_WILDCARD } from "../../../src/web/router";
import { HomePage } from "./pages/homepage";
import { BlogPage } from "./pages/blog/blogpage";

@component({
  tag: 'div'
})
export class App extends st.component {

  rerenderTest = false;

  render() {

    console.log('App render');

    let newHomePage = (
      <HomePage
        id="home_456"
        tabIndex={2}
        class="lol"
        style={{
          backgroundColor: "green",
        }}
      />
    );

    if (this.rerenderTest) {
      newHomePage = (
        <HomePage
          id="home_456re"
          tabIndex={2}
          class="lolre"
          style={{
            backgroundColor: "magenta",
          }}
        />
      );
      console.log('re-render', newHomePage)
    }


    const routeList = (
      <RouteList doRender>
        <Route path={[HomePage.ROUTE, PATH_START, PATH_WILDCARD]} >
          {newHomePage}
        </Route>
        <Route path={BlogPage.ROUTE}>
          <BlogPage tag="span" blogPageId={9} />
        </Route>
      </RouteList>
    );

    return routeList;
  }

  onAfterInitialRender() {
    setTimeout(() => {
      console.log("re-render app, isssue?");
      this.rerenderTest = true;

      this.doRender();
    }, 1500);
  }
}

st.render(<App />);
