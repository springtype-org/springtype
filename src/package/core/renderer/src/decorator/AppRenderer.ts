import {setAppRenderer} from "../function/setAppRenderer";
import {RendererConfig} from "../interface/RendererConfig";

export function AppRenderer(appRendererConfig: RendererConfig): any {

    // called with @AppRenderer() or @AppRenderer({})
    if (!(typeof appRendererConfig === 'function')) {

        return (target: any) => {
            setAppRenderer(appRendererConfig);
            return target;
        }
    }
}