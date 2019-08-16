const fs = require('fs');

export const saveDOMSnapshot = (outputPath: string, snapshot: string) => {
    fs.writeFileSync(outputPath, snapshot);
};