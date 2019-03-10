import {RendererImplType} from "../enum/RendererImplType";
import {TSXRendererImpl} from "../impl/TSXRendererImpl";
import {ApplicationContext} from "../../../di";
import {RendererConfig} from "../..";
import {RendererImpl} from "../interface/RendererImpl";

export const getRendererImplInstance = (rendererConfig: RendererConfig): RendererImpl => {

    let rendererImpl: RendererImpl;

    // custom impl provided via config
    if (rendererConfig.impl) {

        rendererImpl = rendererConfig.impl;

    } else {

        // using standard implementation
        switch (rendererConfig.type) {

            default:
            case RendererImplType.TSX:
                rendererImpl = ApplicationContext.getInstance().getBean(TSXRendererImpl);
                break;
        }
    }
    return rendererImpl;
};