import {st} from "../../../../src/core";
import {component} from "../../../../src/web/component";
import {tsx} from "../../../../src/web/vdom";
import {Route, RouteList} from "../../../../src/web/router";
import {ROUTE_HOME_ADMIN, ROUTE_HOME_BASE, ROUTE_HOME_NOT_PERMITTED, ROUTE_NOT_ALLOWED} from "../routes";
import {IRouteMatch, IRouterGuardResponse} from "../../../../src/web/router/interface";

@component
export class HomePage extends st.component {
    counter = 0;
    style = {display: 'block'};

    render() {
        return <fragment>
            <div>Home</div>
            <RouteList>
                <Route exact={true} path={ROUTE_HOME_BASE}>
                    <div>base</div>
                </Route>
                <Route exact={true} path={ROUTE_HOME_ADMIN}>
                    <div>admin</div>
                </Route>
                <Route exact={true} path={ROUTE_HOME_NOT_PERMITTED} guard={async (match) => {
                    return this.homeGuard(match)
                }}>
                    <div>secret stuff here</div>
                </Route>
            </RouteList>
        </fragment>
    }

    async homeGuard(match: IRouteMatch): Promise<IRouterGuardResponse> {
        let resolveGuard: IRouterGuardResponse = true;
        if (match.path === ROUTE_HOME_NOT_PERMITTED) {
            const number = this.counter % 3;
            switch (number) {
                case 1 :
                    console.log('route');
                    resolveGuard = ROUTE_NOT_ALLOWED;
                    break;
                case 2:
                    console.log('custom component');
                    resolveGuard = <div>custom comp 403</div>;
                    break;
            }

            this.counter++;
        }

        // simulating to run an async request against a server and only resolve to a component when
        // the response is processed and it turns out to render this component dynamically
        return new Promise(resolve => setTimeout(() => resolve(resolveGuard), 3000));
    }
}
