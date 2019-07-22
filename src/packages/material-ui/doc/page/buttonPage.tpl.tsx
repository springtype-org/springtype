import {VirtualElement} from "@springtype/core";
import {ButtonPage} from "./buttonPage";

export const template = (view: ButtonPage): VirtualElement => {

    const x = <div>
        <div>
            <div>
                <mwc-checkbox label="outlined"  checked={view.outlined} onclick={() => {view.outlined = !view.outlined}}></mwc-checkbox>
            </div>
            <div>
                <mwc-checkbox label="raised" checked={view.raised} onclick={() => view.raised = !view.raised}></mwc-checkbox>
            </div>
            <div>
                <mwc-checkbox label="unelevated" checked={view.unelevated} onclick={() => view.unelevated = !view.unelevated}></mwc-checkbox>
            </div>
            <div>
                <mwc-checkbox label="dense"  checked={view.dense} onclick={() => view.dense = !view.dense}></mwc-checkbox>
            </div>
            <div>
                <mwc-checkbox label="disabled" checked={view.disabled} onclick={() => view.disabled = !view.disabled}></mwc-checkbox>
            </div>
            <div>
                <mwc-checkbox label="ripple" checked={view.ripple} onclick={() => view.ripple = !view.ripple}></mwc-checkbox>
            </div>
{/*
            <div>
                <mwc-checkbox label="trailing-icon"></mwc-checkbox>
            </div>
*/}
        </div>
        <mwc-button label={"mwc button"}
                    outlined={view.outlined}
                    raised={view.raised}
                    unelevated={view.unelevated}
                    dense={view.dense}
                    disabled={view.disabled}
                    ripple={view.ripple}
        >
        </mwc-button>
    </div>;

    console.log(Date.now());
    console.log(Date.now());


    console.table(x.children[0].children);

    return x;
};
