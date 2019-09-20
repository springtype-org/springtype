export const log = (...args: Array<any>) => {
	if (process.env.NODE_ENV != "production") {
		console.log(...args);
	}
};

export const info = (...args: Array<any>) => {
	if (process.env.NODE_ENV != "production") {
		console.info(...args);
	}
};
export const warn = (...args: Array<any>) => {
	if (process.env.NODE_ENV != "production") {
		console.warn(...args);
	}
};

export const error = (...args: Array<any>) => {
	if (process.env.NODE_ENV != "production") {
		console.error(...args);
	}
};
