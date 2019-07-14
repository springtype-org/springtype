import {WebComponentImpl} from "../interface/WebComponentImpl";

export function UseWebComponent(component: WebComponentImpl<any>, ...moreComponents: Array<WebComponentImpl<any>>): any {
    return (targetWebComponent: any) => {
        return targetWebComponent;
    }
}