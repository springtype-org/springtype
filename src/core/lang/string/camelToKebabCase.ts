export const camelToKebabCase = (name: string): string => {
	return name.replace(/[A-Z]/g, g => "-" + g[0].toLowerCase());
};
