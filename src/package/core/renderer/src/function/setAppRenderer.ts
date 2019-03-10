import {ApplicationContext} from "../../../di";
import {getRendererImplInstance} from "./getRendererImplInstance";
import {RendererConfig} from "../..";
import {APP_RENDERER} from "../constant/APP_RENDERER";

export const setAppRenderer = (appRendererConfig: RendererConfig): void => {
    ApplicationContext.getInstance().set(APP_RENDERER,  getRendererImplInstance(appRendererConfig));
};
