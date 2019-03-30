import {setupReloadOnCodeChange} from "../..";

// @ts-ignore
const _module = module;

export function ReloadOnCodeChange(target: any): any {
    setupReloadOnCodeChange(_module);
    return target;
}