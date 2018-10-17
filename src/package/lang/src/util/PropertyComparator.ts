export class PropertyComparator {
    private constructor() {
    }

    /**
     * This function deep equals 2 object
     * by comparing all properties
     * @param obj1 first object
     * @param obj2 second object
     * @param type the type of equality
     */
    public static equal(obj1: any, obj2: any, type: Type = Type.EQUAL): boolean {
        obj1 = PropertyComparator.noPrimitive(obj1);
        obj2 = PropertyComparator.noPrimitive(obj2);

        if (obj1 === obj2) {
            return true;
        }

        else if ((typeof obj1 == "object" && obj1 != null) && (typeof obj2 == "object" && obj2 != null)) {
            const obj1Keys = Object.keys(obj1);
            const length1 = obj1Keys.length;
            const length2 = Object.keys(obj2).length;
            // same amount of properties
            if (type === Type.EQUAL && length1 != length2
                // length of properties of obj1 bigger than properties are missing
                || type === Type.PARTIAL && length1 > length2) {
                return false;
            }
            for (const prop of obj1Keys) {
                // check if obj2 has the property of obj1 and check the value
                if (obj2.hasOwnProperty(prop) && PropertyComparator.equal(obj1[prop], obj2[prop], type)) {
                    continue;
                }
                // don't has the property or not equal
                return false;
            }
            // everything is equal
            return true;
        }
        // maybe null or undefined
        return false;
    }

    private static noPrimitive(value: any): any {
        if (value instanceof String)
        {
            return value.valueOf();
        }
        if (value instanceof Number) {
            return value.valueOf();
        }
        return value;
    }
}


export enum Type {
    PARTIAL,
    EQUAL
}