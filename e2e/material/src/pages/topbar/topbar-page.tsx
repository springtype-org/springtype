import { CustomElement, ILifecycle, tsx} from "../../../../../src/web";
import {Use} from "../../../../../src/core/di";
import {TopBarContainer} from "./top-bar-container";

@Use(TopBarContainer)
@CustomElement("topbar-page", {shadowMode: "none"})
export class TopBarPage extends HTMLElement implements ILifecycle {
    static ROUTE = "";

    render() {


        return <div style="margin: 15px">
            <h1>MWC Top Bar</h1>
            <p> MWC Top Bar are a container for items such as application title, navigation icon, and action
                items. </p>
            <top-bar-container></top-bar-container>
        </div>
    }
}
