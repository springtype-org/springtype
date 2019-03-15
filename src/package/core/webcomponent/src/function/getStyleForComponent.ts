import {StyleFunction} from "../../../tss";
import {STYLE} from "../constant/STYLE";

export const getStyleForComponent = (webComponent: any): StyleFunction => {
    return Reflect.get(webComponent, STYLE);
};