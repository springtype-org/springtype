import {CheckboxPage} from "./checkbox-page";

export default (component: CheckboxPage) =>{
    return <st-fragment>
        <h1>Checkbox</h1>
        <p>
            Checkboxes allow the user to select one or more items from a set.
        </p>
        <mwc-checkbox checked={true} label={'checked'}></mwc-checkbox>
        <mwc-checkbox checked={false} label={'not checked'}></mwc-checkbox>
        <mwc-checkbox checked={'indeterminate'} label={'indeterminate'}></mwc-checkbox>
    </st-fragment>

}