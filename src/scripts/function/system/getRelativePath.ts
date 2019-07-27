import {getAbsoluteCwd} from "./getAbsoluteCwd";

export function getRelativePath(path: string) {
    return  '.' + path.replace(getAbsoluteCwd(), '');
}