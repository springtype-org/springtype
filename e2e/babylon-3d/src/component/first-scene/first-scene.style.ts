import { css } from "../../../../../src/web/tss";
import { FirstScene } from "./first-scene";

export default (component: FirstScene, theme: any) => css`
    .FirstScene {
        display: block;
        height: 100%;
        width: 100%;
    }

    canvas {
        z-index: 0;
        position: fixed;
        width: 100%;
        height: 100%;
    }

    iframe {
        position: absolute;
        z-index: 2;
        opacity: 0.9;
        box-shadow: 0 8px 6px -6px #fff;
        background: #000;
    }

    #logo {
        position: fixed;
        z-index: 2;
        bottom: 16px;
        right: 16px;
        opacity: 0.8;
    }

    h1 {
        text-align: center;
        font-size: 2rem;
        padding-top: 5vh;
        color: #fff;
        font-family: 'Orbitron', sans-serif;
    }

    section {
        position: absolute;
        z-index: 1;
        display: block;
        width: 100%;
        height: 100%;
    }

`;
