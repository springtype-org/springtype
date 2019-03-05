import {StyleMode, TSStyledComponent} from "./TSStyledComponent";
import {HOST_SELECTOR} from "../../../../src/package/tss/src/CSSInlineStyleGenerator";

export default (view: TSStyledComponent) => ({

    // or ':host', see https://developer.mozilla.org/en-US/docs/Web/CSS/:host()
    [HOST_SELECTOR]: {
        border: '1px solid #000'
    },

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

});


