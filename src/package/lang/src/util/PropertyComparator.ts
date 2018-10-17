export class PropertyComparator {
    private constructor() {
    }

    /**
     * Compares two objects by equaling all own property types and values.
     */
    public static equal(a: any, b: any, type: CompareType = CompareType.EQUAL): boolean {

        a = PropertyComparator.toPrimitive(a);
        b = PropertyComparator.toPrimitive(b);

        if (a === b) {

            return true;

        } else if (
            (typeof a == "object" && a != null) &&
            (typeof b == "object" && b != null)
        ) {

            const aKeys = Object.keys(a);
            const aKeyLength = aKeys.length;
            const bKeyLength = Object.keys(b).length;

            // same amount of properties
            if (type === CompareType.EQUAL && aKeyLength !== bKeyLength
                // length of properties of a bigger than properties are missing
                || type === CompareType.PARTIAL && aKeyLength > bKeyLength) {
                return false;
            }

            for (const prop of aKeys) {

                // check if b has the property of a and check the value
                if (b.hasOwnProperty(prop) &&
                    PropertyComparator.equal(a[prop], b[prop], type)) {

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

    private static toPrimitive(value: any): any {

        if (value !== null && typeof value === 'object') {
            return value.valueOf();
        }
        return value;
    }
}


export enum CompareType {
    PARTIAL,
    EQUAL
}