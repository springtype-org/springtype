import {ApplicationContext} from "../../../di";
import {defaultRendererConfig} from "../defaultRendererConfig";
import {RendererImpl} from "../interface/RendererImpl";
import {RendererConfig} from "../../index";
import {getRendererImplInstance} from "../function/getRendererImplInstance";

const RENDERER = 'RENDERER';

export const getRenderer = (): RendererImpl => {

    let rendererImpl = ApplicationContext.getInstance().get(RENDERER);

    // @Renderer(...) not used in application
    if (!rendererImpl) {
        setRenderer(defaultRendererConfig);
    }
    return ApplicationContext.getInstance().get(RENDERER);
};

export const setRenderer = (appRendererConfig: RendererConfig): void => {
    ApplicationContext.getInstance().set(RENDERER,  getRendererImplInstance(appRendererConfig));
};

export const ActiveRenderer = getRenderer();