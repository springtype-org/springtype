import {RendererConfig} from "../interface/RendererConfig";
import {getRenderer, setRenderer} from "../context/renderer";

export function Renderer(rendererConfig: RendererConfig): any {

    // called with @AppRenderer() or @AppRenderer({})
    if (!(typeof rendererConfig === 'function')) {

        return (target: any) => {
            setRenderer(rendererConfig);
            return target;
        }
    }
}


@Renderer({})
class DefaultRenderer {}