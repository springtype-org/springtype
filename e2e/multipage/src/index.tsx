import { st } from "../../../dist/core";
import { component } from "../../../dist/web/component";
import { PATH_DEFAULT, PATH_WILDCARD, Route, RouteList } from "../../../dist/web/router";
import { tsx } from "../../../dist/web/vdom";
import { BlogPage } from "./pages/blog/Blog";
import { HomePage } from "./pages/home/Home";

@component()
export class AppModule extends st.component {

  render() {

    console.log('new routelist and homepage')
    const newHomePage = <HomePage class={["lol"]} style={{
      background: 'green'
    }} id={Date.now()} />;

    return (
      <RouteList>
        <Route path={[PATH_DEFAULT, PATH_WILDCARD, HomePage.ROUTE]} component={newHomePage} />
        <Route path={BlogPage.ROUTE} component={<BlogPage id="myBlog" />} />
      </RouteList>
    );
  }

  onAfterInitialRender() {

    setTimeout(() => {

      console.log('re-render AppModule');
      this.doRender();
    }, 500)
  }
}

st.render(<AppModule />);
