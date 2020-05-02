import { st } from "../../../../src/core";
import { attr, component } from "../../../../src/web/component";
import { ILifecycle, AttrType } from "../../../../src/web/component/interface";
import { tsx } from "../../../../src/web/vdom";

@component
export class E2eSlotted extends st.component implements ILifecycle {

  @attr(AttrType.DOM_TRANSPARENT)
  some: string = "some";


  render() {
    return (
      <div>
        Begin
        <div>
          Header
          {this.renderSlot("header", "Default header content")}
        </div>
        {this.renderChildren(`Default slot ${this.some} default content`)}
        <div>
          <div>
            Footer
            {this.renderSlot("footer", "Default footer content")}
          </div>
        </div>
        End
      </div>
    );
  }
}
