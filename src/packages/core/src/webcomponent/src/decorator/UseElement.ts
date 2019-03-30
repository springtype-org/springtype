import {WebComponentImpl} from "../interface/WebComponentImpl";

export function UseElement(component: WebComponentImpl<any>): any {
    return (targetWebComponent: any) => {
        return targetWebComponent;
    }
}