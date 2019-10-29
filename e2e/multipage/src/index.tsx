import { st } from "../../../src/core";
import { route } from "../../../src/web/router";
import { RouterOutlet } from '../../../src/web/router/router-outlet';
import { tsx } from "../../../src/web/vdom";
import { BlogPage } from "./pages/blog/Blog";
import { FirstPostPage } from "./pages/blog/posts/FirstPost";
import { HomePage } from "./pages/home/Home";

@route(HomePage.ROUTE, HomePage)
@route(BlogPage.ROUTE, BlogPage)
@route(FirstPostPage.ROUTE, {
  component: FirstPostPage,
  guard: async () => {
    // reject access randomly
    return Math.random() > 0.5;
  },
})
export class AppModule {}

st.render(<RouterOutlet />);
