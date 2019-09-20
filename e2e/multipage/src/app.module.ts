import { customElementsHMRPolyfill } from "../../../src/web/polyfill";
import { Route } from "../../../src/web/router/decorator/Route";
import { BlogPage } from "./pages/blog/Blog";
import { FirstPostPage } from "./pages/blog/posts/FirstPost";
import { HomePage } from "./pages/home/Home";

if (process.env.NODE_ENV === "development") {
	customElementsHMRPolyfill;
}

@Route(HomePage.ROUTE, HomePage)
@Route(BlogPage.ROUTE, BlogPage)
@Route(FirstPostPage.ROUTE, FirstPostPage)
export class AppModule {}
