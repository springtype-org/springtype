import { st } from "../../../src/core";
import { component, attr } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { AttrType } from "../../../src/web/component/trait/attr";
import {Nested} from "./nested";
import { Link } from "../../../src/web/router";

@component
export class E2EDomTransparencyTest extends st.component implements ILifecycle {

  id = 'transparent123'

  tag = 'div'

  class = ['foo', 'bar']

  style = {
    display: 'block',
    backgroundColor: '#ccc',
    height: '100px'
  }

  tabIndex = "3";

  @attr(AttrType.DOM_TRANSPARENT)
  foo = 123;

  render() {
    // and they change reactively, no matter the time
    this.id = '123transparent';
    console.log('rerender');
    return <Nested class="outer"><Link path="test" class="link-from-outer">Test link</Link>Attributes are DOM transparent and applied internally</Nested>;
  }
}

st.render(<E2EDomTransparencyTest/>);
