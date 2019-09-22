import { st } from "../st";

if (!st.log) {
	st.log = (...args: Array<any>) => {
		if (process.env.NODE_ENV != "production") {
			console.log(...args);
		}
	};

	st.info = (...args: Array<any>) => {
		if (process.env.NODE_ENV != "production") {
			console.info(...args);
		}
	};

	st.warn = (...args: Array<any>) => {
		if (process.env.NODE_ENV != "production") {
			console.warn(...args);
		}
	};

	st.error = (...args: Array<any>) => {
		if (process.env.NODE_ENV != "production") {
			console.error(...args);
		}
	};
}
