import {st} from "../../../src/core";
import {component} from "../../../src/web/component";
import {ILifecycle} from "../../../src/web/component/interface";
import {tsx} from "../../../src/web/vdom";
import {HomePage} from "./page/homepage";
import {PATH_START, PATH_WILDCARD, Route, RouteList} from "../../../src/web/router";
import {PageHeader} from "./header";
import {ROUTE_ABOUT, ROUTE_HOME, ROUTE_NOT_ALLOWED} from "./routes";
import "./index.css";
import {IRouteMatch} from "../../../src/web/router/interface";

@component
export class RouterPage extends st.component implements ILifecycle {
    flip = false;

    render() {
        this.flip = !this.flip;
        return (
            <div unwrap>
                <PageHeader/>

                <RouteList>
                    {/* shows the HomePage when no route is given, nothing matches and on /#/home, /home and /#home */}
                    <Route path={[ROUTE_HOME, PATH_START, PATH_WILDCARD]} guard={this.homeGuard}
                           style={{backgroundColor: 'green'}}>
                        <template slot={Route.SLOT_NAME_LOADING_COMPONENT}>
                            <div>Loading (simulating long-running request)...</div>
                            <div>...</div>
                        </template>
                        <div>first home element</div>
                        <HomePage style={{backgroundColor: 'blue'}}/>
                    </Route>

                    {/* Renders the AboutPage on /about after async import */}
                    <Route path={ROUTE_ABOUT}>
                        {() => import("./page/aboutpage")}
                    </Route>
                    <Route cacheGroup={'none'} path={ROUTE_NOT_ALLOWED}>
                        <div>403</div>
                    </Route>
                </RouteList>
            </div>
        );
    }

    async homeGuard(match: IRouteMatch): Promise<true | string> {

        // simulating to run an async request against a server and only resolve to a component when
        // the response is processed and it turns out to render this component dynamically
        return new Promise(resolve => setTimeout(() => resolve(true), 2000));
    }
}

st.render(<RouterPage/>);
