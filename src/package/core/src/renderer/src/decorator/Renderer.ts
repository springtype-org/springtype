import {setRenderer} from "../function/setRenderer";
import {RendererConfig} from "../interface/RendererConfig";

export function Renderer(rendererConfig: RendererConfig): any {

    // called with @AppRenderer() or @AppRenderer({})
    if (!(typeof rendererConfig === 'function')) {

        return (target: any) => {
            setRenderer(rendererConfig);
            return target;
        }
    }
}