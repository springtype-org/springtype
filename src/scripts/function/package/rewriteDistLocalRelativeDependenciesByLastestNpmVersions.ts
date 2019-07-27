const path = require('path');
const fs = require('fs');

export function rewriteDistLocalRelativeDependenciesByLastestNpmVersions(distPackageJson: any) {

    if (distPackageJson.dependencies) {

        for (let packageName in distPackageJson.dependencies)  {

            if (distPackageJson.dependencies.hasOwnProperty(packageName)) {

                const packageVersion = distPackageJson.dependencies[packageName];

                // local, relative transient dependency to be replaced by latest version
                if (packageVersion.startsWith('../')) {

                    const latestNpmVersion = JSON.parse(fs.readFileSync(path.resolve(packageVersion, 'package.json'), 'utf8')).version;

                    distPackageJson.dependencies[packageName] = latestNpmVersion;
                }

            }
        }
    }
    return distPackageJson;
}