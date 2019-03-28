import {StyleFunction} from "../../../tss";
import {setStyleForComponent} from "../reflector/protoype/style";

export function Style(style: StyleFunction): any {
    return (targetWebComponent: any) => {

        setStyleForComponent(targetWebComponent, style);

        return targetWebComponent;
    }
}