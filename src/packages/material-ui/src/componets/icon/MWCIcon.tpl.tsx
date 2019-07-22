import {ActiveRenderer} from "@springtype/core";
import {MWCIcon} from "./MWCIcon";

export default (view: MWCIcon) => {

    return <i class="material-icons">
        {view.name}
    </i>;
}