import {st} from "../../../src/core";
import {component} from "../../../src/web/component";
import {tsx} from "../../../src/web/vdom";
import {Link} from "../../../src/web/router";
import {ROUTE_ABOUT, ROUTE_HOME, ROUTE_HOME_ADMIN, ROUTE_HOME_BASE, ROUTE_HOME_NOT_PERMITTED} from "./routes";
import "./header.css"
@component
export class PageHeader extends st.component {

    flip = true;

    render() {
        this.flip = !this.flip;
        return (
            <ul>
                <li>
                    <Link id="456" class={this.flip ? "bar" : "bar2"}
                          path={ROUTE_HOME}>Home {this.flip ? "bar" : "bar2"}</Link>
                    <ul>
                        <li>
                            <Link path={ROUTE_HOME_ADMIN}>admin</Link>
                        </li>
                        <li>
                            <Link path={ROUTE_HOME_BASE}>base</Link>
                        </li>
                        <li>
                            <Link path={ROUTE_HOME_NOT_PERMITTED}>secret stuff</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link path={ROUTE_ABOUT} params={{name: 'foo'}}>About</Link>
                </li>
                <li id="problem">
                    <Link key="000" class="foo bar" path={ROUTE_ABOUT} params={{name: 'foo key 000'}}>About2</Link><br/>
                    <Link key="123" class="foo bar" path={ROUTE_ABOUT} params={{name: 'foo key 123'}}>About3</Link><br/>
                    <Link key="456" class="foo bar" path={ROUTE_ABOUT} params={{name: 'foo key 456'}}>About4</Link>
                </li>
            </ul>
        );
    }

    onAfterInitialRender() {
        setTimeout(() => {
            console.log('after 1sec');
            this.doRender();
        }, 2000);
    }
}
