import tpl from "./popup-page.tpl";
import tss from "./popup-page.style";
import {CustomElement} from "../../../../../src/web/customelement";

@CustomElement('popup-page',{tpl,tss})
export class PopupPage extends HTMLElement {
    constructor() {
        super();
    }

    onButtonClick(evt: any) {
        evt.preventDefault();
        if (evt.target) {
            let color = "green";
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                // @ts-ignore
                chrome.tabs.executeScript(tabs[0].id,
                    {code: 'document.body.style.backgroundColor = "' + color + '";'});
            });
        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'popup-page': Partial<PopupPage>;
        }
    }
}

