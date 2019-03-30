import {RouterImpl} from "./RouterImpl";
import {RouterImplType} from "../enum/RouterImplType";

export interface RouterConfig {
    impl?: RouterImpl;
    type?: RouterImplType;
}