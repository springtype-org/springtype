import {StyleFunction} from "../../../tss";
import {STYLE} from "../constant/STYLE";

export const setStyleForComponent = (webComponent: any, style: StyleFunction) => {
    Reflect.set(webComponent, STYLE, style);
};