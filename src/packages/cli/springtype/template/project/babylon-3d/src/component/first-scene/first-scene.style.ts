import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {FirstScene} from "./first-scene";

export default (component: FirstScene, theme: any): TypedMediaQueryStyleSheet => ({
    "first-scene": {
        "display": "block",
        "height": "100%",
        "width": "100%"
    },

    "canvas": {
        zIndex: 0,
        position: 'fixed',
        width: '100%',
        height: '100%'
    },

    "iframe": {
        position: 'absolute',
        zIndex: 2,
        opacity: 0.9,
        boxShadow: '0 8px 6px -6px #fff',
        background: '#000'
    },

    "#logo": {
        position: 'fixed',
        zIndex: 2,
        bottom: '16px',
        right: '16px',
        opacity: 0.8
    },

    "h1": {
        textAlign: 'center',
        fontSize: '2rem',
        paddingTop: '5vh',
        color: '#fff',
        fontFamily: "'Orbitron', sans-serif"
    },

    "section": {
        position: 'absolute',
        zIndex: 1,
        display: 'block',
        width: '100%',
        height: '100%'
    }
});
