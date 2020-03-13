/**
 * equals to objects properties (only first level)
 *
 * if o1 or o2 not defined it will be falls
 * @param o1 first object to compare
 * @param o2 second object to compare
 */
export const equalObjects = (o1: any, o2: any): boolean => {
    if (!o1 && !o2) {
        return true;
    }
    if (o1 && !o2) {
        return false;
    }
    if (o1 && !o2) {
        return false;
    }

    const equalObject = (obj1: any, obj2: any) => {
        for (const val of Object.keys(obj1)) {
            if (!obj2[val]) {
                return false;
            }
            if (obj1[val] !== obj2[val]) {
                return false;
            }
        }
        return true;
    };

    if (!equalObject(o1, o2)) {
        return false;
    }
    return equalObject(o2, o1);
};