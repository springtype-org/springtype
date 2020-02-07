export const getUniqueId = (): string => {
    return Math.random().toString(36).substring(7)
};