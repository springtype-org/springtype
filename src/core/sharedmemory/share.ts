import {
	IOnPropChangeHandler,
	PropChangeType
} from "../cd/interface/ion-prop-change";
import {
	DEFAULT_EMPTY_PATH,
	PropChangeManager
} from "../cd/prop-change-manager";
import { isPrimitive } from "../lang/is-primitive";
import { st } from "../st/st";

/* internal API */

// used by @Share decorator internally
export const SHARED_MEMORY: any = "SHARED_MEMORY";
const DEFAULT_SHARED_MEMORY_VALUE = {};
const HANDLER_OWNING_INSTANCE: any = Symbol("HANDLER_OWNING_INSTANCE");

// used by @Share decorator internally
export const initSharedMemory = () => {
	if (!st[SHARED_MEMORY]) {
		st[SHARED_MEMORY] = {};
	}
};

const callChangeHandlers = (
	onChangeHandlers: Array<IOnPropChangeHandler>,
	name: string,
	type: PropChangeType,
	value: any,
	prevValue: any,
	path: string = DEFAULT_EMPTY_PATH
) => {
	for (let onChnageHandler of onChangeHandlers) {
		onChnageHandler({
			name,
			type,
			path,
			value,
			prevValue
		});
	}
};

const initSharedMemoryEntry = (shareName: string, initialValue: any) => {
	if (!st[SHARED_MEMORY][shareName]) {
		st[SHARED_MEMORY][shareName] = {
			value: undefined,
			onChangeHandlers: []
		};

		// set initial value in shared memory
		st[SHARED_MEMORY][shareName].value = initialValue;

		PropChangeManager.onPropChange(
			st[SHARED_MEMORY][shareName],
			"value",
			(value: any, prevValue: any) => {
				callChangeHandlers(
					st[SHARED_MEMORY][shareName].onChangeHandlers,
					shareName,
					PropChangeType.CHANGE,
					value,
					prevValue
				);
			},
			(path: string, value: any, prevValue: any) => {
				callChangeHandlers(
					st[SHARED_MEMORY][shareName].onChangeHandlers,
					shareName,
					PropChangeType.CHANGE,
					value,
					prevValue,
					path
				);
			}
		);
	}
};

/* public API */

/**
 * Registers a change handler for a global shared object to be called on reference or deep change.
 * @param shareName App-wide unique name of the share
 * @param onChange Handler function, called on change
 * @param instance Optional instance reference to allow for correct GC. Should be used with @Share
 */
export const addChangeHandler = (
	shareName: string,
	onChange: IOnPropChangeHandler,
	instance?: any
) => {
	initSharedMemory();
	if (typeof onChange == "function") {
		if (instance) {
			(onChange as any)[HANDLER_OWNING_INSTANCE] = instance;
		}
		st[SHARED_MEMORY][shareName].onChangeHandlers.push(onChange);
	}
};

if (!st.addShareChangeHandler) {
	st.addShareChangeHandler = addChangeHandler;
}

/**
 * Initializes a global shared object
 * @param shareName App-wide unique name of the share
 * @param initialValue Initial value. Must be an Object or Array
 * @param onChange Handler function to be applied when the shared object gets changed by reference or deeply
 * @param instance Optional instance reference to allow for correct GC. Should be used with @Share
 */
function initShare<S = {}>(
	shareName: string,
	initialValue: S,
	onChange?: IOnPropChangeHandler,
	instance?: any
) {
	if (isPrimitive(initialValue)) {
		throw new Error(
			`🔥You cannot share a primitive value like ${initialValue}. The shared value of ${shareName.toString()} must be an object.`
		);
	}
	initSharedMemory();
	initSharedMemoryEntry(shareName, initialValue);
	addChangeHandler(shareName, onChange!, instance);

	return st[SHARED_MEMORY][shareName].value;
}
if (!st.initShare) {
	st.initShare = initShare;
}
/**
 * Removes single change handlers for cases where the functional API is used.
 * @param sharedName Name of the share
 * @param [onChange] Handler function reference. Must equal (===) the orginal function registered
 */
export const removeChangeHandler = (
	sharedName: string,
	onChange?: IOnPropChangeHandler
) => {
	let index = st[SHARED_MEMORY][sharedName].onChangeHandlers.indexOf(onChange);
	if (index > -1) {
		st[SHARED_MEMORY][sharedName].onChangeHandlers.splice(index, 1);
	}
};

if (!st.removeShareChangeHandler) {
	st.removeShareChangeHandler = removeChangeHandler;
}
/**
 * Used for class instance GC. Removes all change handlers that belong to a GC'd instance.
 * @param instance Custom element instance or generic class instance
 */
export const removeSharedMemoryChangeHandlersOfInstance = (instance: any) => {
	if (st[SHARED_MEMORY]) {
		for (let sharedName in st[SHARED_MEMORY]) {
			st[SHARED_MEMORY][sharedName].onChangeHandlers = st[SHARED_MEMORY][
				sharedName
			].onChangeHandlers.filter((onChange: any) => {
				if (
					onChange &&
					onChange[HANDLER_OWNING_INSTANCE] &&
					onChange[HANDLER_OWNING_INSTANCE] === instance
				) {
					return false;
				}
				return true;
			});
		}
	}
};

/**
 * Returns a shared object (preferred to be initialized first using `initShare(...)`, else uses an empty object)
 * @param shareName App-wide unique name of the share
 * @param onChange Handler function to be applied when the shared object gets changed by reference or deeply
 * @param instance Optional instance reference to allow for correct GC. Should be used with @Share
 */
function getShare<S = {}>(
	shareName: string,
	onChange?: IOnPropChangeHandler,
	instance?: any
): S {
	initSharedMemory();
	initSharedMemoryEntry(shareName, DEFAULT_SHARED_MEMORY_VALUE);
	addChangeHandler(shareName, onChange!, instance);
	return st[SHARED_MEMORY][shareName].value;
}
if (!st.getShare) {
	st.getShare = getShare;
}
