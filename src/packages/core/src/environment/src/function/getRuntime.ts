import {ApplicationRuntime} from "../enum/ApplicationRuntime";

export const getRuntime = (): ApplicationRuntime => {
    if (typeof window != 'undefined') {
        return ApplicationRuntime.WEBBROWSER;
    }
    return ApplicationRuntime.NODE;
};