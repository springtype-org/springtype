import {TextfieldPage} from "./textfield-page";
import {enumToArray} from "@springtype/core";
import {MWC_TEXTFIELD_VARIANT_TYPE} from "../../..";

export default (component: TextfieldPage) => {
    const variantValues = enumToArray(MWC_TEXTFIELD_VARIANT_TYPE);
    const tableRows = [];
    for (let i = 0; i < variantValues.length; i++) {
        const currentVariant = variantValues[i];
        tableRows.push(<tr>
            <td>
                <mwc-textfield label={currentVariant} variant={currentVariant}></mwc-textfield>
            </td>

            <td>
                <mwc-textfield label={currentVariant} variant={currentVariant} shaped={true}></mwc-textfield>
            </td>
            <td>
                <mwc-textfield label={currentVariant} variant={currentVariant} disabled={true}></mwc-textfield>
            </td>
            <td>
                <mwc-textfield label={currentVariant} variant={currentVariant} icon={'event'}></mwc-textfield>
            </td>
            <td>
                <mwc-textfield label={currentVariant} variant={currentVariant} trailing-icon={true} icon={'delete'}></mwc-textfield>
            </td>
        </tr>)
    }
    return <st-fragment>
        <h1>Text Field </h1>
        <p>
            Text fields allow users to input, edit, and select text.
        </p>
        <table>
            <thead>
            <th>none</th>
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