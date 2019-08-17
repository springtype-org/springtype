export const renameTypeScriptFilesToJS = (typeScriptFileName: string): string => {

    return typeScriptFileName
        .replace('.tsx', '.js')
        .replace('.ts', '.js')
};