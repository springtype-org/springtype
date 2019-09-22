export const HEIGHT_DENSE = 48;
export const HEIGHT = 64;

export default () => {
    return {
        '.hidden': {
            'display': 'none !important'
        },
        '.mdc-top-app-bar--non-fixed': {
            'position': 'relative'
        },
        '.mdc-top-app-bar--prominent-fixed-adjust.mdc-top-app-bar--dense': {
            'padding-top': '96px'
        },
        '.mdc-top-app-bar--fixed-adjust.mdc-top-app-bar--dense': {
            'padding-top': HEIGHT_DENSE + 'px'
        },
        '.mdc-top-app-bar--short, .mdc-top-app-bar__row': {
            'height': HEIGHT + 'px'
        },
        '.mdc-top-app-bar--short': {
            'top': 'unset',
            'left': 'unset'
        },
        '.mdc-top-app-bar': {
            '-webkit-transition': 'width 2s',
            'transition': 'width 2s',
            'box-shadow': '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        }, '.mdc-top-app-bar--fixed': {
            'position': 'absolute',
        }
    }
}

