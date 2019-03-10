export const transformTSXAttributeNames = (attributeName: string): string => {

    switch (attributeName) {
        /**
         * Some standard JSX/TSX attribute names are transformed
         * so that IDE support broadened.
         */
        case 'classname':
        case 'className':
            return 'class';
        default:
            return attributeName
    }
};