import {RendererImpl} from "./RendererImpl";
import {RendererImplType} from "../enum/RendererImplType";

export interface RendererConfig {
    impl?: RendererImpl;
    type?: RendererImplType;
}