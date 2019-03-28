import {StyleFunction} from "../../../../tss";

const STYLE = 'STYLE';

export const getStyleForComponent = (webComponent: any): StyleFunction => {
    return Reflect.get(webComponent, STYLE);
};

export const setStyleForComponent = (webComponent: any, style: StyleFunction) => {
    Reflect.set(webComponent, STYLE, style);
};