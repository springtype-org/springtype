import { TYPE_FUNCTION } from "./type-function";
import { TYPE_OBJECT } from "./type-object";

export const isPrimitive = (value: any) =>
	value === null || (typeof value !== TYPE_OBJECT && typeof value !== TYPE_FUNCTION);
