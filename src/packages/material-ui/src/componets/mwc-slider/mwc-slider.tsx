import {Lifecycle, Style, Template, WebComponent} from "@springtype/core";
import tpl from "./mwc-slider.tpl";
import style from "./mwc-slider.style";
import {MDCSlider} from '@material/slider';

@WebComponent('mwc-slider')
@Template(tpl)
@Style(style)
export class MwcSlider extends HTMLElement implements Lifecycle {
    onBeforeFlow(initial?: boolean): boolean | void {
        const slider = this.querySelector('.mdc-slider');
        if (slider) {

           const _slider = new MDCSlider(slider);
            _slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));
        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-slider': Partial<MwcSlider>;
        }
    }
}

