import {StyleMode, TSStyledComponent} from "./TSStyledComponent";

export default (view: TSStyledComponent) => ({

    ':component': {
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


