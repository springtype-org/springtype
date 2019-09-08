import {MwcTopBar} from "./mwc-top-bar";
import {ActiveRenderer} from "@springtype/core";

export default (component: MwcTopBar) =>
    <header class="mdc-top-app-bar">
        <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
                <span class="mdc-top-app-bar__title">Title</span>
            </section>
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
                <st-slot slot={"button"}/>
                <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Download">file_download</button>
                <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Print this page">print</button>
                <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Bookmark this page">bookmark</button>
            </section>
        </div>
    </header>
;

