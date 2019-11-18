export const cloneArray = (array: Array<any>) => {
  const clone: any = [];
  for (let i = 0; i < array.length; i++) {
    clone[i] = immute(array[i]);
  }
  return clone;
};

export const cloneObject = (object: Object): Object => {
  const clone: any = {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      clone[key] = immute((object as any)[key]);
    }
  }
  return clone;
};

export const immute = (arrayOrObject: any) => {
  const type = Object.prototype.toString.call(arrayOrObject);
  if (type === "[object Object]") {
    return cloneObject(arrayOrObject);
  }
  if (type === "[object Array]") {
    return cloneArray(arrayOrObject);
  }
  return arrayOrObject;
};
