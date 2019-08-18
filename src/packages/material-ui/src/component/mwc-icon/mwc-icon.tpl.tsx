import {MwcIcon} from "./mwc-icon";
import {ActiveRenderer} from '../../../../core';

export default (component: MwcIcon) =>
    <i class="material-icons">
        {component.name}
    </i>;


