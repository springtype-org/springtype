import {WebComponent, Lifecycle, Style, Template, Use} from "@springtype/core";
import tpl from "./tob-bar-page.tpl";
import style from "./tob-bar-page.style";
import { MwcSnackbar, MwcTopBar } from '@springtype/material-ui';

@Use(MwcTopBar,MwcSnackbar)
@WebComponent('tob-bar-page')
@Template(tpl)
@Style(style)
export class TobBarPage extends HTMLElement {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'tob-bar-page': Partial<TobBarPage>;
        }
    }
}

