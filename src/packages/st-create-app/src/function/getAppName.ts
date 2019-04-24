const path = require('path');

export const getAppName = (projectPath: string): string => {
    const root = path.resolve(projectPath);
    return path.basename(root);
};