import {ApplicationContext} from "../../../di";
import {getRendererImplInstance} from "./getRendererImplInstance";
import {RendererConfig} from "../..";
import {RENDERER} from "../constant/RENDERER";

export const setRenderer = (appRendererConfig: RendererConfig): void => {
    ApplicationContext.getInstance().set(RENDERER,  getRendererImplInstance(appRendererConfig));
};
