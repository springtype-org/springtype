import {NamespaceAttribute} from "../interface/NamespaceAttribute";
import {DEFAULT_NAMESPACE_DELIMITER} from "../constants";
import {CaseTransformer} from "../../../../../lang";

const NS_INDICATOR_ATTRIBUTES = [
    'xmlnsXlink',
    'xmlnsSvgjs',
    'xlinkHref',
    'xlinkActuate',
    'xlinkArcrole',
    'xlinkRole',
    'xlinkShow',
    'xlinkTitle',
    'xlinkType',
    'xmlBase',
    'xmlLang',
    'xmlSpace',
];

export const parseAttributeNS = (name: string): NamespaceAttribute => {

    if (!!name && NS_INDICATOR_ATTRIBUTES.indexOf(name) > -1) {

        const nsParts = CaseTransformer.camelCaseToColonCase(name).split(DEFAULT_NAMESPACE_DELIMITER)
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
        name: name
    };
};