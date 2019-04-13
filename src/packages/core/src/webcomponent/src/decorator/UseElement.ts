import {WebComponentImpl} from "../interface/WebComponentImpl";

export function UseElement(component: WebComponentImpl<any>, ...moreComponents: Array<WebComponentImpl<any>>): any {
    return (targetWebComponent: any) => {
        return targetWebComponent;
    }
}