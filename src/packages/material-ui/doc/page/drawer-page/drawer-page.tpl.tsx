import {ButtonPage} from "./button-page";
import {enumToArray} from "@springtype/core";
import {MWCBUTTON_VARIANT_TYPE} from "../../..";

export default (component: ButtonPage) => {


    const variantValues = enumToArray(MWCBUTTON_VARIANT_TYPE);
    const tableRows = [];
    for (let i = 0; i < variantValues.length; i++) {
        const currentVariant = variantValues[i];
        tableRows.push(<tr>
            <td>
                <mwc-button onclick={(evt: Event)=> {console.log('fuck')}} label={currentVariant} variant={currentVariant}></mwc-button>
            </td>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant} dense={true}></mwc-button>
            </td>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant} shaped={true}></mwc-button>
            </td>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant} disabled={true}></mwc-button>
            </td>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant} icon={'favorite'}></mwc-button>
            </td>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant} trailing-icon={true}
                            icon={'favorite'}></mwc-button>
            </td>
        </tr>)
    }
    return <st-fragment>
        <h1>Button</h1>
        <p>
            Buttons communicate an action a user can take. They are typically placed throughout your UI, in places
            like
            dialogs, forms, cards, and toolbars.
        </p>
        <table>
            <thead>
            <th>none</th>
            <th>dense</th>
            <th>shaped</th>
            <th>disabled</th>
            <th>icon</th>
            <th>trailing-icon</th>
            </thead>
            <tbody>
            {tableRows}
            </tbody>
        </table>
    </st-fragment>
}


