export const cloneArray = (array: Array<any>, deep: boolean = true) => {
  const clone: any = [];
  for (let i = 0; i < array.length; i++) {
    if (deep) {
      clone[i] = immute(array[i]);
    } else {
      clone.push(array[i]);
    }
  }
  return clone;
};

export const cloneObject = (object: Object, deep: boolean = true): Object => {
  const clone: any = {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      if (deep) {
        clone[key] = immute((object as any)[key]);
      } else {
        clone[key] = (object as any)[key];
      }
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
