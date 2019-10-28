import { css } from "../../../../../src/web/tss";
import { TemplateNameMain } from "./templatename-main";

export default (component: TemplateNameMain, theme: any) => css`
    body, html {
        padding: 0;
        margin: 0;
        height: 100%;
        background: #000;
    }
    .TemplateNameMain {
        position: absolute;
        display: block;
        height: 100%;
        width: 100%;
    }
`;
