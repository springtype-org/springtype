import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";
import { BlogPage } from "./pages/blog/blogpage";
import { HomePage } from "./pages/homepage";
import { Route, RouteList, PATH_DEFAULT, PATH_WILDCARD } from "../../../src/web/router";

@component({ tag: "div" })
export class App extends st.component {
  render() {
    console.log("new routelist and homepage");

    const newHomePage = (
      <HomePage
        class={["lol"]}
        style={{
          background: "green",
        }}
      />
    );

    const routeList = (
      <RouteList>
        <Route path={[PATH_DEFAULT, PATH_WILDCARD, HomePage.ROUTE]} component={newHomePage} />
        <Route path={BlogPage.ROUTE} component={<BlogPage tag="span" blogPageId={9} />} />
      </RouteList>
    );

    return routeList;
  }

  onAfterInitialRender() {
    setTimeout(() => {
      console.log("re-render app, isssue with");
      //this.doRender();
    }, 500);
  }
}

st.render(<App />);
