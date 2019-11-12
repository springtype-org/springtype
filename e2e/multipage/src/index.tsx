import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { PATH_DEFAULT, PATH_WILDCARD, Route, RouteList } from "../../../src/web/router";
import { tsx } from "../../../src/web/vdom";
import { BlogPage } from "./pages/blog/Blog";
import { HomePage } from "./pages/home/Home";

@component()
export class AppModule extends st.component {

  render() {
    return (
      <RouteList>
        <Route path={[PATH_DEFAULT, PATH_WILDCARD, HomePage.ROUTE]} component={<HomePage />} />
        <Route path={BlogPage.ROUTE} component={<BlogPage id="myBlog" />} />
      </RouteList>
    );
  }
}

st.render(<AppModule />);
