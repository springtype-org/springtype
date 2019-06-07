export default (elementName: string) => ({

    'body, html': {
        'padding': '0',
        'margin': '0',
        'height': '100%',
    },

    '.container': {
        'margin': 'auto',
        'border-radius': '5px',
        'padding': '5%',
        'box-shadow': '0px 0px 98px 16px rgba(0,0,0,0.45)',
        'background': '#1a6da9',
    },
    'code': {
        'background': 'rgba(0, 0, 0, 0.4)',
        'border-radius': '4px',
        'padding': '2px 5px',
    },
    [elementName]: {
        'display': 'flex',
        'flex-direction': 'column',
        'font-family': 'sans-serif',
        'color': '#fff',
        'text-align': 'center',
        'background': '#1a5886',
        'font-size': '1.5em',
        'height': '100%',
    },
    'a': {
        'color': '#fff',
        'padding': '5px',
        'text-decoration': 'none',
        'background': '#1a5886',
        'border-radius': '5px',
    },
    'svg#logo': {
        'animation': 'logo 5s infinite',
    },
    '@keyframes logo': {
        '50%': {
            'transform': 'rotateY(180deg)'
        }
    }
});
