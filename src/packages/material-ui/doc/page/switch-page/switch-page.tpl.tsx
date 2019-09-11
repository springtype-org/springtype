import {SwitchPage} from "./switch-page";
import { ActiveRenderer } from '@springtype/core';

export default (component: SwitchPage) =>{
    return <st-fragment>
        <h1>Switch</h1>
        <p>
            Switches toggle the state of a single setting on or off. They are the preferred way to adjust settings on mobile.
        </p>
        <mwc-switch checked={true} label={'on/off'}/>
        <br/>
        <mwc-switch checked={false} label={'on/off'}/>
    </st-fragment>

}