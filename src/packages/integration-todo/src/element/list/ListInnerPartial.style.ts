import {TypedStyleSheet} from "@springtype/core";

export const style = (): TypedStyleSheet => ({

    'app-list-inner-partial .btn': {
        marginRight: '10px',
        // traditional style
        'margin-top': '19.5px'
    },

    'app-list-inner-partial .todo-item': {
        height: '75px',
        'line-height': '75px',
        display: 'flex',
    },

    'app-list-inner-partial .todo-item-text': {
        flex: [
            'non-auto',
            'auto'
        ]
    },

    'app-list-inner-partial span': {
        marginTop: '26px'
    }
});