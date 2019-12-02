import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { HomePage } from "./page/homepage";
import { RouteList, Route, PATH_START, PATH_WILDCARD } from "../../../src/web/router";
import { PageHeader } from "./header";
import { ROUTE_HOME, ROUTE_ABOUT } from "./routes";
import "./index.css";

@component
export class RouterPage extends st.component implements ILifecycle {
  render() {
    return (
      <div unwrap>
        <PageHeader />

        <RouteList>
          {/* shows the HomePage when no route is given, nothing matches and on /#/home, /home and /#home */}
          <Route
            path={[ROUTE_HOME, PATH_START, PATH_WILDCARD]}
            loadingComponent={<div>Loading (simulating long-running request)...</div>}
            guard={async () => {

              // simulating to run an async request against a server and only resolve to a component when
              // the response is processed and it turns out to render this component dynamically
              return new Promise(resolve => setTimeout(() => resolve(<HomePage />), 2000));
            }}
          />

          {/* Renders the AboutPage on /about after async import */}
          <Route path={ROUTE_ABOUT}>
            {() => import("./page/aboutpage")}
          </Route>
        </RouteList>
      </div>
    );
  }
}

st.render(<RouterPage />);
