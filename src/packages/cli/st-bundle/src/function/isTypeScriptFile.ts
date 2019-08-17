export const isTypeScriptFile = (fileName: string) => {
    return fileName.endsWith('.ts') || fileName.endsWith('.tsx');
};