import {Namespace} from "../interface/Namespace";
import {NamespaceAttributesMap} from "../interface/NamespaceAttributesMap";
import {Attribute} from "../interface/Attribute";
import {DEFAULT_NAMESPACE_DELIMITER, DEFAULT_NAMESPACE_NAME, DOM_ELEMENT_INJECT_ATTRIBUTE_NAME} from "../constants";
import {CaseTransformer} from "../../../../../lang/src/string/CaseTransformer";
import {parseAttributeNS} from "./parseAttributeNS";

export const collectNamespaceAttributes = (attributes: Object, knownNamespaces: Array<Namespace>): NamespaceAttributesMap => {

    let collectedNamespaceAttributes: Array<Attribute> = [];

    // 0. transform TSX attribute names (like: "className") back to standard attribute names ("class")
    const transformedAttributes: Attribute[] = Object.entries(attributes)
        .map(([name, value]): Attribute => ({
            name,
            value
        }));

    // 0.1 collect all possible namespace attributes

    // order required

    // 1. filter all namespaces
    const rawXmlNs = transformedAttributes.filter((attribute: Attribute) =>
        attribute.name.indexOf(DEFAULT_NAMESPACE_NAME) == 0);

    // 1.1 get namespace values
    const xmlNs = knownNamespaces.concat(

        rawXmlNs
            .map((attribute) => {
                if (parseAttributeNS(attribute.name).found) {
                    return {
                        name: CaseTransformer.camelCaseToColonCase(attribute.name)
                            .split(DEFAULT_NAMESPACE_DELIMITER).filter(s => !!s).pop() || '',
                        value: attribute.value
                    };
                } else {
                    return {
                        name: attribute.name.split(DEFAULT_NAMESPACE_DELIMITER).filter(s => !!s).pop() || '',
                        value: attribute.value
                    };
                }
            })
            .filter((attrib) => !!attrib.name)
    );

    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(rawXmlNs);

    // 3. filter all DOM element injections
    const injections = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute) =>
            DOM_ELEMENT_INJECT_ATTRIBUTE_NAME === attribute.name);

    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(injections);

    // 4. filter all events
    let event = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute: Attribute) =>
            attribute.name.startsWith('on') &&
            typeof attribute.value === 'function');

    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(event);

    // 5. filter all properties
    const property = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute: Attribute) =>
            typeof attribute.value !== 'string' &&
            typeof attribute.value !== 'number' &&
            typeof attribute.value !== 'boolean');

    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(property);

    // 6. filter all html
    const html = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute: Attribute) =>
            typeof attribute.value === 'string' ||
            typeof attribute.value === 'number' ||
            typeof attribute.value === 'boolean');

    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(html);

    return {
        injections: injections,
        xmlNs: xmlNs,
        event: event.map(
            (attribute: Attribute) =>
                <[string, Function]>([
                    attribute.name.substring(2, attribute.name.length).toLowerCase(), attribute.value
                ])
        ),
        property: property,
        html: html,
        other: transformedAttributes.filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
    }
};
