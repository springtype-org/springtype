const PROPERTY_BINDING_VARIABLE = 'bind';
export const DEFAULT_NAMESPACE_NAME: string = 'xmlns';
export const DEFAULT_NAMESPACE_DELIMITER: string = '$$';
export type Attribute = { name: string, value: any };
export type Namespace = { name: string, value: string };
export type NamespaceResult = { hasNs: boolean, value?: Namespace };
const correctAttributeNaming = (attributeName: string): string => {

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

const getNamespace = (index: number, attributeName: string, knownNamespaces: Namespace[]): NamespaceResult => {
    const nsName = attributeName.substr(0, index + 1);
    const newAttributeName = attributeName.substr(index);
    const result: Namespace | undefined = knownNamespaces.find((nsp) => nsName == nsp.name);
    if (result) {
        return {hasNs: true, value: {name: newAttributeName, value: result.value}};
    }
    return {hasNs: false};
};

export interface SortedAttributes {
    bind: Attribute[],
    xmlns: Namespace[],
    event: [string, Function][],
    property: Attribute[],
    html: Attribute[],
    other: Attribute[]
}

export const checkNameNs = (name: string): { found: boolean, name: string, ns?: string } => {
    if (!!name) {
        const parts = name.split(DEFAULT_NAMESPACE_DELIMITER).filter(s => !!s);
        if (parts.length == 2) {
            return {found: true, name: parts[1], ns: parts[2]};
        }
    }
    return {found: false, name: name};
};


export const mapAttributes = (attributes: any, knownNamespaces: Namespace[]): SortedAttributes => {
    let used: Attribute[] = [];

    // 0. correct names
    const correctAttributes: Attribute[] = Object.entries(attributes)
        .map(([name, value]): Attribute => ({name: correctAttributeNaming(name), value: value}));
    // 0.1 get all possible namespace attributes


    // order required
    // 1. filter all namespaces
    const rawXmlns = correctAttributes.filter((attrib) => attrib.name.indexOf(DEFAULT_NAMESPACE_NAME) == 0);
    // 1.1 get namespace values
    const xmlns = knownNamespaces.concat(
        rawXmlns.map((attrib): Attribute => ({
            name: attrib.name.split(DEFAULT_NAMESPACE_DELIMITER).filter(s => !!s).pop() || '',
            value: attrib.value
        }))
            .filter((attrib) => !!attrib.name)
    );
    used = used.concat(rawXmlns);

    // 3. filter all bindings
    const bind = correctAttributes
        .filter(e => used.indexOf(e) < 0)
        .filter((attrib) => PROPERTY_BINDING_VARIABLE === attrib.name);
    used = used.concat(bind);

    // 4. filter all events
    const event = correctAttributes
        .filter(e => used.indexOf(e) < 0)
        .filter((attrib) => attrib.name.startsWith('on') && typeof attrib.value === 'function');
    used = used.concat(event);

    // 5. filter all properties
    const property = correctAttributes
        .filter(e => used.indexOf(e) < 0)
        .filter((attrib) => typeof attrib.value !== 'string' && typeof attrib.value !== 'number' && typeof attrib.value !== 'boolean');
    used = used.concat(property);

    // 6. filter all html
    const html = correctAttributes
        .filter(e => used.indexOf(e) < 0)
        // only string allowed
        .filter((attrib) => typeof attrib.value === 'string' || typeof attrib.value === 'number' || typeof attrib.value === 'boolean');

    used = used.concat(html);

    return {
        bind: bind,
        xmlns: xmlns,
        event: event.map((attrib) => <[string, Function]>([attrib.name.substring(2, attrib.name.length).toLowerCase(), attrib.value])),
        property: property,
        html: html,
        other: correctAttributes.filter(e => used.indexOf(e) < 0)
    }
};
