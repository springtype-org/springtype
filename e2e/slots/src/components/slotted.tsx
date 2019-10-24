import { st } from "../../../../src/core";
import { attr, customElement } from "../../../../src/web/customelement";
import { ILifecycle } from "../../../../src/web/customelement/interface";
import { AttrType } from "../../../../src/web/customelement/trait/attr";
import { tsx } from "../../../../src/web/vdom";

@customElement()
export class E2ESlotted extends st.element implements ILifecycle {

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
      "E2ESlotted": Partial<E2ESlotted>;

      // this is only necessary for demonstration of the 1:1 e2e test case
      "e2eslotted": Partial<E2ESlotted>;
    }
  }
}
