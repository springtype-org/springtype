export const Effect = (clazz: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {

    console.log('@Effect', clazz, '.', methodName, descriptor);
};