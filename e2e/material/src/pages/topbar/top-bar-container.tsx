import "../../../../../material/src/component/mwc-top-bar/mwc-top-bar";
import { VariantType } from "../../../../../material/src/component/mwc-top-bar/mwc-top-bar";
import { st } from "../../../../../src/core/st";
import { attr, customElement } from "../../../../../src/web/customelement";
import { tsx } from "../../../../../src/web/vdom";
import { IVirtualNode } from "../../../../../src/web/vdom/interface";

@customElement("top-bar-container")
export class TopBarContainer extends st.element {
  @attr
  "attr-type": VariantType = false;

  @attr
  "attr-name": any;

  render(): IVirtualNode {
    const result = (
      <div>
        <h2>{this["attr-name"]}</h2>
        <div style="max-width: 400px; max-height: 300px; overflow: hidden; scrollbar-y: auto; overflow-y: auto; border: 1px black solid;">
          <mwc-top-bar mwc-title={this["attr-name"]} mwc-variant={this["attr-type"]} />
          <div>
            <div style="margin: 15px;">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa
                <strong> strong</strong>. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis
                eu pede{" "}
                <a class="external ext" href="#">
                  link{" "}
                </a>
                mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
                Curabitur ullamcorper ultricies nisi.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
    //console.log("result container", JSON.stringify(result, null, 2));

    return result;
  }

  onAttributeChange(name: string, newValue: any, oldValue: any) {
    console.log("onAttributeChange", name, newValue, oldValue);
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "top-bar-container": Partial<TopBarContainer>;
    }
  }
}
