export const enumToArray = (enumeration: any) => {
    return Object.keys(enumeration)
        .map(key => enumeration[key]);
};