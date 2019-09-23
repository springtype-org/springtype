import { st } from "../../../src/core";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill/custom-elements-hmr-polyfill";
import { route } from "../../../src/web/router";
import { BlogPage } from "./pages/blog/Blog";
import { FirstPostPage } from "./pages/blog/posts/FirstPost";
import { HomePage } from "./pages/home/Home";

if (process.env.NODE_ENV === "development") {
  customElementsHMRPolyfill;
}

@route(HomePage.ROUTE, HomePage)
@route(BlogPage.ROUTE, BlogPage)
@route(FirstPostPage.ROUTE, FirstPostPage)
export class AppModule {}

st.dom.setRoot("router-outlet");
