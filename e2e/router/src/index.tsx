import { st } from "../../../dist/core";
import { component } from "../../../dist/web/component";
import { ILifecycle } from "../../../dist/web/component/interface";
import { Route, RouteList } from "../../../dist/web/router";
import { tsx } from "../../../dist/web/vdom";
import { AboutPage } from "./page/about";
import { HomePage } from "./page/home";

@component()
export class TemplateName extends st.component implements ILifecycle {
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
          <Route path={["/about/:name"]} component={<AboutPage />}></Route>
        </RouteList>
      </div>
    );
  }
}

st.render(<TemplateName />);
