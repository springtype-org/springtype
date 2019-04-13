import {getRuntime} from "./getRuntime";
import {ApplicationRuntime} from "../enum/ApplicationRuntime";

export const getRuntimeGlobalObject = (): Object => {
    // Note: maybe use globalThis someday (when the standard API is stable)

    switch (getRuntime()) {
        case ApplicationRuntime.WEBBROWSER:

            if (!(window as any)['$st']) {
                (window as any)['$st'] = {};
            }
            return (window as any).$st;
    }

    // return local object context
    return {};
};