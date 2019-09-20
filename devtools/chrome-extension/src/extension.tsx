import {PopupPage} from "./page/popup-page/popup-page";
import {OptionPage} from "./page/option-page/option-page";
import {getQueryParameter} from "./function/getQueryParameter";
import {Use} from "../../../src/core/di";
import {CustomElement} from "../../../src/web/customelement";
import {tsx} from "../../../src/web/vdom";

@Use(PopupPage)
@Use(OptionPage)
@CustomElement('custom-block')
export class extension extends HTMLElement {

    constructor() {
        super();
    }

    render() {
        const value = getQueryParameter('page');
        switch (value) {
            case 'option':
                return <option-page/>;
            case 'popup':
                return <popup-page/>;
        }
    }

}

