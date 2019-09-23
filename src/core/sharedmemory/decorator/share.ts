import { GlobalCache } from "../../st/interface/i$st";
import { st } from "../../st/st";
import { initSharedMemory } from "../share";

export const share = (shareName: string): any => {
	initSharedMemory();

	return (instance: any, propName: string) => {
		// instead of reading and writing from/to the class instance memory,
		// use the shared memory instead
		Object.defineProperty(instance, propName, {
			get: () => {
				return st[GlobalCache.SHARED_MEMORY][shareName].value;
			},
			set: value => {
				st[GlobalCache.SHARED_MEMORY][shareName].value = value;
			},
			configurable: false
		});
	};
};
