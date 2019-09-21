import { st } from "../../st/ST";
import { initSharedMemory, SHARED_MEMORY } from "../share";

export function share(shareName: string): any {
	initSharedMemory();

	return (instance: any, propName: string) => {
		// instead of reading and writing from/to the class instance memory,
		// use the shared memory instead
		Object.defineProperty(instance, propName, {
			get: () => {
				return st[SHARED_MEMORY][shareName].value;
			},
			set: value => {
				st[SHARED_MEMORY][shareName].value = value;
			},
			configurable: false
		});
	};
}
