import {DEFAULT_NAMESPACE_DELIMITER} from "../constant/DEFAULT_NAMESPACE_DELIMITER";
import {NamespaceAttribute} from "../interface/NamespaceAttribute";

export const parseAttributeNS = (namespace: string): NamespaceAttribute => {

    if (!!namespace) {

        const nsParts = namespace.split(DEFAULT_NAMESPACE_DELIMITER)
            .filter(nsPart => !!nsPart);

        if (nsParts.length == 2) {

            return {
                found: true,
                name: nsParts[1],
                ns: nsParts[2]
            };
        }
    }

    return {
        found: false,
        name: namespace
    };
};