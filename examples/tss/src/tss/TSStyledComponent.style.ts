import {StyleMode, TSStyledComponent} from "./TSStyledComponent";
import {CSSStyleSheetDeclaration} from "../../../../src/package/css";

export default (view: TSStyledComponent): CSSStyleSheetDeclaration => ({

    'div > a': {
        color: '#cc0000',
        margin: view.props.styleMode === StyleMode.INVERTED ? '30px' : '60px',
        backgroundColor: 'green',
        paddingLeft: '20px',
        paddingRight: '20px'
    },

    // style isolated when shadow: true is set
    'body': {
        backgroundColor: 'red'
    }

} as CSSStyleSheetDeclaration);


