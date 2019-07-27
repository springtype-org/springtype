import {chdirSync} from "./chdirSync";

export function chdirToBaseDir(fromPackageName: string) {

    const subPathCount = fromPackageName.split('/').length - 1;
    let parentDirs = '../../';

    for (let i=0; i<subPathCount; i++) {
        parentDirs += '../';
    }
    chdirSync(parentDirs);
}