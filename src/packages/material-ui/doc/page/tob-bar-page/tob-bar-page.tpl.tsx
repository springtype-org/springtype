import {TobBarPage} from "./tob-bar-page";
import {ActiveRenderer} from '../../../../core';

export default (component: TobBarPage) =>
    <st-fragment>
        <mwc-top-bar></mwc-top-bar>
        <mwc-snackbar/>
    </st-fragment>
;
