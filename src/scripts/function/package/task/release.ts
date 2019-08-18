import {getDistPackageJson} from "../getDistPackageJson";
import {getPackageJson} from "../getPackageJson";
import {rewriteDistLocalRelativeDependenciesByLastestNpmVersions} from "../rewriteDistLocalRelativeDependenciesByLastestNpmVersions";
import {writeDistPackageJson} from "../writeDistPackageJson";
import {writePackageJson} from "../writePackageJson";
import {chdirSync} from "../../system/chdirSync";
import {distDirectory} from "../../../definition/distDirectory";
import {spawnCmd} from "../../system/spawnCmd";
const { Input } = require('enquirer');

export const release = async() => {

    let distPackageJson = getDistPackageJson();
    const packageJson = getPackageJson();

    const versionChoice = await (new Input({
        message: 'Please choose a new semver version',
        initial: distPackageJson.version
    })).run();

    distPackageJson.version = versionChoice;
    packageJson.version = versionChoice;

    // remove outdated gitHead reference
    delete packageJson.gitHead;
    delete distPackageJson.gitHead;

    distPackageJson = rewriteDistLocalRelativeDependenciesByLastestNpmVersions(distPackageJson);

    // write ./dist/package.json
    writeDistPackageJson(distPackageJson);

    // write ./package.json
    writePackageJson(packageJson);

    // cd ./dist
    chdirSync(distDirectory);

    // publish package using npm
    await spawnCmd('npm', ['publish']);
};