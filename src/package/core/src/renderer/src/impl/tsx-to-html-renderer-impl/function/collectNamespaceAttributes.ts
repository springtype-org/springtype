import {Namespace} from "../interface/Namespace";
import {NamespaceAttributesMap} from "../interface/NamespaceAttributesMap";
import {Attribute} from "../interface/Attribute";
import {DEFAULT_NAMESPACE_DELIMITER, DEFAULT_NAMESPACE_NAME, PROPERTY_BIND_VARIABLE} from "../constants";

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
        rawXmlNs.map((attribute: Attribute): Attribute => ({
            name: attribute.name.split(DEFAULT_NAMESPACE_DELIMITER).filter(s => !!s).pop() || '',
            value: attribute.value
        }))
        .filter((attrib) => !!attrib.name)
    );

    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(rawXmlNs);

    // 3. filter all bindings
    const bind = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute) =>
            PROPERTY_BIND_VARIABLE === attribute.name);

    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(bind);

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
        bind: bind,
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
