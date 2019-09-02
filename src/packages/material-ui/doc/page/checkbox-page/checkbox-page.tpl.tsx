import {CheckboxPage} from "./checkbox-page";

export default (component: CheckboxPage) =>{
    return <st-fragment>
        <h1>Checkbox</h1>
        <p>
            Checkboxes allow the user to select one or more items from a set.
        </p>
        <mwc-checkbox checked={true} label={'checked'}/>
        <mwc-checkbox checked={false} label={'not checked'}/>
        <mwc-checkbox checked={'indeterminate'} label={'indeterminate'}/>
    </st-fragment>

}