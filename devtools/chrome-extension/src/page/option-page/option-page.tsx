import tpl from "./option-page.tpl";
import tss from "./option-page.style";
import {CustomElement, ILifecycle} from "../../../../../src/web/customelement";

@CustomElement('option-page',{
    tpl,
    tss
})
export class OptionPage extends HTMLElement {
}


declare global {
    namespace JSX {
        interface IntrinsicElements {
            'option-page': Partial<OptionPage>;
        }
    }
}

