import {IndexPage} from "./index-page";
import {ActiveRenderer} from '@springtype/core';

export default (component: IndexPage) =>
    <st-fragment>
        <ul>
            <li><a href="/#/mwc-button">Button</a></li>
            <li><a href="/#/mwc-textfield">Textfield</a></li>
            <li><a href="/#/mwc-checkbox">Checkbox</a></li>
            <li><a href="/#/mwc-switch">Switch</a></li>
            <li><a href="/#/mwc-top-bar">Top Bar</a></li>
        </ul>
    </st-fragment>
;

