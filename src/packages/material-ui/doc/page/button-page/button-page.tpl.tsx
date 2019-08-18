import {ButtonPage} from "./button-page";
import {MWC_BUTTON_VARIANT_TYPE} from "../../..";
import {enumToArray} from "@springtype/core";

export default (component: ButtonPage) => {


    const variantValues = enumToArray(MWC_BUTTON_VARIANT_TYPE);
    const tableRows = [];
    for (let i = 0; i < variantValues.length; i++) {
        const currentVariant = variantValues[i];
        tableRows.push(<tr>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant}/>
            </td>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant} dense={true}/>
            </td>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant} shaped={true}/>
            </td>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant} disabled={true}/>
            </td>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant} icon={'favorite'}/>
            </td>
            <td>
                <mwc-button label={currentVariant} variant={currentVariant} trailing-icon={true} icon={'favorite'}/>
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


