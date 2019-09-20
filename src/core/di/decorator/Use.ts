// @ts-ignore: This is only to fulfill the interface; idea is that using @Use(ctorRef)
// the ctorRef must be imported in the origin class
export const Use = (ctor: any) => {
	return (originalCtor: any) => {
		return originalCtor;
	};
};
