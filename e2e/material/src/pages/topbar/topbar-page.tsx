import { ISelectItem } from "../../../../../material/src/component/mwc-select/ISelectItem";
import "../../../../../material/src/component/mwc-select/mwc-select";
import { VariantType } from "../../../../../material/src/component/mwc-top-bar/mwc-top-bar";
import { st } from "../../../../../src/core/st";
import { customElement } from "../../../../../src/web/customelement";
import { tsx } from "../../../../../src/web/vdom";
import "./top-bar-container";

@customElement("topbar-page", { shadowMode: "none" })
export class TopBarPage extends st.element {
	static ROUTE = "";
	activeVariantType: VariantType = false;
	static selectItems: ISelectItem<VariantType>[] = [
		{ value: false, displayValue: <strong>Standard</strong> },
		{ value: "prominent", displayValue: <strong>Prominent</strong> },
		{ value: "short", displayValue: <strong>Short</strong> },
		{ value: "fixed", displayValue: <strong>Fixed</strong> },
		{
			value: "fixed-prominent",
			displayValue: <strong>Fixed-Prominent</strong>
		},
		{ value: "fixed-short", displayValue: <strong>Fixed-Short</strong> }
	];

	render() {
		return (
			<div>
				<div style="margin: 15px">
					<h1>MWC Top Bar</h1>
					<p>
						{" "}
						MWC Top Bar are a container for items such as application title,
						navigation icon, and action items.{" "}
					</p>

					<mwc-select
						mwc-label="MWC Top Bar Variants"
						mwc-items={TopBarPage.selectItems}
					/>
					<top-bar-container type={this.activeVariantType} />
				</div>
			</div>
		);
	}
}
