import { st } from "../../../../src/core";
import { attr, component } from "../../../../src/web/component";
import { ILifecycle } from "../../../../src/web/component/interface";
import { AttrType } from "../../../../src/web/component/trait/attr";
import { tsx } from "../../../../src/web/vdom";

@component()
export class E2eSlotted extends st.component implements ILifecycle {

  @attr(AttrType.DOM_TRANSPARENT)
  some: string = "some";

  render() {
    return <div>
      Begin
      <div>
        Header
        <slot name="header">Default header content</slot>
      </div>
      <slot>Default slot {this.some} default content</slot>
      <div>
        <div>
          Footer
          <slot name="footer">Default footer content</slot>
        </div>
      </div>
      End
    </div>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "E2eSlotted": Partial<E2eSlotted>;

      // this is only necessary for demonstration of the 1:1 e2e test case
      "e2e-slotted": Partial<E2eSlotted>;
    }
  }
}
