import {ApplicationContext} from "../../../di";
import {RENDERER} from "../constant/RENDERER";
import {setRenderer} from "./setRenderer";
import {defaultRendererConfig} from "../constant/defaultRendererConfig";
import {RendererImpl} from "../interface/RendererImpl";

export const getRenderer = (): RendererImpl => {

    let rendererImpl = ApplicationContext.getInstance().get(RENDERER);

    // @Renderer(...) not used in application
    if (!rendererImpl) {
        setRenderer(defaultRendererConfig);
    }
    return ApplicationContext.getInstance().get(RENDERER);
};
