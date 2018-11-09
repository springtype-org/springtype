const PROPERTY_BINDING_VARIABLE = 'bind';
export const DEFAULT_NAMESPACE_NAME: string = 'xmlns';
const CORRECT_ATTRIBUTE_NAMING = (attributeName: string): string => {

    // TODO: Fix architecture
    switch (attributeName) {

        case 'xmlnsXlink':
            return 'xmlns:xlink';
        case 'xlinkHref':
            return 'xlink:href';
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

export interface Attributes {
    bind: [string, any][],
    xmlns: [string, string][],
    event: [string, any][],
    property: [string, any][],
    html: [string, any][],
    other: [string, any][]
}

export const mapAttributes = (attributes: any): Attributes => {
    let used: [string, any][] = [];

    // 0. correct names
    const correctAttributes: [string, any][] = Object.entries(attributes)
        .map(([name, value]): [string, any] => [CORRECT_ATTRIBUTE_NAMING(name), value]);

    // order required
    // 1. filter all namespaces
    const xmlns = correctAttributes.filter(([n, _]) => n.indexOf(DEFAULT_NAMESPACE_NAME) == 0);
    used = used.concat(xmlns);

    // 2. filter all bindings
    const bind = correctAttributes
        .filter(e => used.indexOf(e) < 0)
        .filter(([n]) => PROPERTY_BINDING_VARIABLE === n);
    used = used.concat(bind);

    // 3. filter all events
    const event = correctAttributes
        .filter(e => used.indexOf(e) < 0)
        .filter(([n, v]) => n.startsWith('on') && typeof v === 'function');
    used = used.concat(event);

    // 4. filter all properties
    const property = correctAttributes
        .filter(e => used.indexOf(e) < 0)
        .filter(([n, v]) => typeof v !== 'string' && typeof v !== 'number' && typeof v !== 'boolean');
    used = used.concat(property);

    // 5. filter all html
    const html = correctAttributes
        .filter(e => used.indexOf(e) < 0)
        // only string allowed

        .filter(([n, v]) => typeof v === 'string' || typeof v === 'number'|| typeof v === 'boolean');
    used = used.concat(html);
    return {
        bind: bind,
        xmlns: xmlns,
        event: event.map(([n, v]) => <[string, Function]>([n.substring(2, n.length).toLowerCase(), v])),
        property: property,
        html: html,
        other: correctAttributes
            .filter(e => used.indexOf(e) < 0)
    }
};

