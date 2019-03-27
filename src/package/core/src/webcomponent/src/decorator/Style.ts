import {StyleFunction} from "../../../tss";
import {setStyleForComponent} from "../function/setStyleForComponent";

export function Style(style: StyleFunction): any {
    return (targetWebComponent: any) => {

        setStyleForComponent(targetWebComponent, style);

        return targetWebComponent;
    }
}