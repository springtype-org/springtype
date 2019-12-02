import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";
import { Link } from "../../../src/web/router";
import { ROUTE_ABOUT, ROUTE_HOME } from "./routes";

@component
export class PageHeader extends st.component {

  flip = true;
  render() {
    console.log('PageHeader render');
    this.flip = !this.flip;
    return (
      <ul>
        <li>
          <Link id="456" style={{ color: 'blue' }} class={this.flip ? "bar" : "bar2"} path={ROUTE_HOME}>Home</Link>
        </li>
        <li>
          <Link path={ROUTE_ABOUT} params={{ name: 'foo' }}>About</Link>
        </li>
      </ul>
    );
  }

  onAfterInitialRender() {
    setTimeout(() => { console.log('after 1sec'); this.doRender(); }, 1000);
  }
}
