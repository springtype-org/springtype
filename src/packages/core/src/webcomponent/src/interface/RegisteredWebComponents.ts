import {ComponentImpl} from "../../../di";

export interface RegisteredWebComponents {
    [tagName: string]: ComponentImpl<any>;
}