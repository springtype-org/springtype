import {WebComponentImpl} from "../interface/WebComponentImpl";

export function UseComponent(component: WebComponentImpl<any>): any {
    return (targetWebComponent: any) => {
        return targetWebComponent;
    }
}