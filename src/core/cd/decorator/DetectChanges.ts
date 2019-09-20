import { createDerivedChangeDetectingClass } from "../createDerivedChangeDetectingClass";

export const DetectChanges = () => {
	return (originalCtor: any) => {
		return createDerivedChangeDetectingClass(originalCtor);
	};
};
