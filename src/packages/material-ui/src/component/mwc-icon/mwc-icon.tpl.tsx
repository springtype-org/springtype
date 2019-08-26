import {MwcIcon} from "./mwc-icon";
import {ActiveRenderer} from '@springtype/core';

export default (component: MwcIcon) =>
    <i class="material-icons">
        {component.name}
    </i>;


