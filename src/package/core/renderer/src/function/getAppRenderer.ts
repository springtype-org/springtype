
import {ApplicationContext} from "../../../di";
import {APP_RENDERER} from "../constant/APP_RENDERER";
import {setAppRenderer} from "./setAppRenderer";
import {defaultAppRendererConfig} from "../constant/defaultAppRendererConfig";
import {RendererImpl} from "../interface/RendererImpl";

export const getAppRenderer = (): RendererImpl => {

    let rendererImpl = ApplicationContext.getInstance().get(APP_RENDERER);

    // @AppRenderer(...) not used in application
    if (!rendererImpl) {
        setAppRenderer(defaultAppRendererConfig);
    }
    return ApplicationContext.getInstance().get(APP_RENDERER);
};
