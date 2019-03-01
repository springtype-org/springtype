import {StyleMode, TSStyledComponent} from "./TSStyledComponent";
import {CSSStyleSheetDeclaration} from "../../../../src/package/css";

export default (view: TSStyledComponent): CSSStyleSheetDeclaration => ({
    'div > a': {
        color: '#cc0000',
        margin: view.props.styleMode === StyleMode.INVERTED ? '30px' : '60px'
    }
});


