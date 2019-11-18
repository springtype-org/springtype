import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { AboutPage } from "./page/aboutpage";
import { HomePage } from "./page/homepage";
import { RouteList, Route } from "../../../src/web/router";

@component
export class RouterPage extends st.component implements ILifecycle {
  render() {
    return (
      <div unwrap>
        <ul>
          <li>
            <a href="/#/home">Home</a>
          </li>
          <li>
            <a href="/#/about/foo">About</a>
          </li>
        </ul>

        <RouteList>
          {/* shows the HomePage when no route is given, nothing matches and on /#/home, /home and /#home */}
          <Route
            path={["", "*", "/home"]}
            loadingComponent={<div>Loading (simulating long-running request)...</div>}
            guard={async () => {
              // simulating to run an async request against a server and only resolve to a component when
              // the response is processed and it turns out to render this component dynamically
              return new Promise(resolve => setTimeout(() => resolve(<HomePage />), 2000));
            }}
          />

          {/* Renders the AboutPage on /about */}
          <Route path={["/about/:name"]} component={<AboutPage />} />
        </RouteList>
      </div>
    );
  }
}

st.render(<RouterPage />);
