import { globalThis } from "../../core";

export const ProxyPolyfill = () => {
	globalThis.Proxy = require("proxy-polyfill/src/proxy")();
	return globalThis.Proxy;
};
