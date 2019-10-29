import { ISelectItem } from "../../../../../material/src/component/mwc-select/ISelectItem";
import "../../../../../material/src/component/mwc-select/mwc-select";
import { VariantType } from "../../../../../material/src/component/mwc-top-bar/mwc-top-bar";
import { st } from "../../../../../src/core/st";
import { attr, customElement } from "../../../../../src/web/customelement";
import { tsx } from "../../../../../src/web/vdom";
import "./top-bar-container";

@customElement("topbar-page")
export class TopBarPage extends st.component {
  static ROUTE = "";
  selectItems: ISelectItem<VariantType>[] = [
    { id: "1", value: false, displayValue: <strong>Standard</strong> },
    { id: "2", value: "prominent", displayValue: <strong>Prominent</strong> },
    { id: "3", value: "short", displayValue: <strong>Short</strong> },
    { id: "4", value: "fixed", displayValue: <strong>Fixed</strong> },
    { id: "5", value: "fixed-prominent", displayValue: <strong>Fixed-Prominent</strong> },
    { id: "6", value: "fixed-short", displayValue: <strong>Fixed-Short</strong> },
  ];

  @attr
  "selected-topbar-item": ISelectItem<VariantType> = { id: "1", value: false, displayValue: <strong>Standard</strong> };

  onAttributeChange(name: string, value: any) {
    console.log("topbar-page onAttributeChange", name, value);
  }

  render() {
    console.log("re-rendering topbar-page", this.selectItems);

    return (
      <div>
        <div style="margin: 15px">
          <h1>MWC Top Bar</h1>
          <p> MWC Top Bar are a container for items such as application title, navigation icon, and action items. </p>

          <mwc-select
            mwc-label="MWC Top Bar Variants"
            mwc-items={this.selectItems}
            onselect={(evt: any) => {
              console.log("evt.detail.data", evt.detail);
              this["selected-topbar-item"] = evt.detail;
            }}
          />
          <top-bar-container attr-type={this["selected-topbar-item"].value} attr-name={this["selected-topbar-item"].displayValue} />
        </div>
      </div>
    );
  }
}
