import {getPackageJson} from "../getPackageJson";
import {spawnCmd} from "../../system/spawnCmd";

export const start = async() => {

    const packageJson = getPackageJson();

    if (!packageJson.bin) {
        throw new Error('There is no "bin" entry in package.json');
    }

    for (let binName in packageJson.bin) {

        if (packageJson.bin.hasOwnProperty(binName)) {

            await spawnCmd('node', [packageJson.bin[binName], ...process.argv.slice(3)]);
        }
    }
};