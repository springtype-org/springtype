export const kebabToCamelCase = (name: string = ''): string => {
    return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
        // transform overall first character upper case too
        .replace(/([a-zA-Z])/, (g) => g[0].toUpperCase());
};