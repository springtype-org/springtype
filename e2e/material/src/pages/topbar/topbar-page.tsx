import {attr, customElement} from "../../../../../src/web/customelement";
import {st} from "../../../../../src/core/st";
import {tsx} from "../../../../../src/web/vdom";
import "./top-bar-container"
import "../../../../../material/src/component/mwc-select/mwc-select";
import {VariantType} from "../../../../../material/src/component/mwc-top-bar/mwc-top-bar";
import {ISelectItem} from "../../../../../material/src/component/mwc-select/ISelectItem";


@customElement("topbar-page", {shadowMode: "none"})
export class TopBarPage extends st.customElement {
    static ROUTE = "";
    selectItems: ISelectItem<VariantType>[] = [
        {value: '1', data: false, displayValue: <strong>Standard</strong>},
        {value: '2', data: "prominent", displayValue: <strong>Prominent</strong>},
        {value: '3', data: "short", displayValue: <strong>Short</strong>},
        {value: '4', data: "fixed", displayValue: <strong>Fixed</strong>},
        {value: '5', data: "fixed-prominent", displayValue: <strong>Fixed-Prominent</strong>},
        {value: '6', data: "fixed-short", displayValue: <strong>Fixed-Short</strong>},
    ];

    @attr()
    'selected-item': ISelectItem<VariantType> = this.selectItems[0];

    constructor() {
        super();
    }

    render() {
        return <div unwrap>
            <mwc-top-bar mwc-title="Material Web Components"/>
            <div>
                <div style="margin: 15px">
                    <h1>MWC Top Bar</h1>
                    <p> MWC Top Bar are a container for items such as application title, navigation icon, and action
                        items. </p>

                    <mwc-select mwc-label="MWC Top Bar Variants" mwc-items={this.selectItems}
                                onchange={(evt: any) => {
                                    this["selected-item"] = evt.detail;
                                }}
                    />

                    <top-bar-container attr-type={this["selected-item"].data}
                                       attr-name={this["selected-item"].displayValue}/>
                </div>
            </div>
        </div>;

    }
}
