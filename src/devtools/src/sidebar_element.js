const getSelectedSpringTypeElement = () => {
    const data = {__proto__: null};

    if (Reflect.get($0.constructor, 'TAG_NAME')) {
        data['@Element'] = Reflect.get($0.constructor, 'TAG_NAME');
    }

    if (Reflect.get($0.constructor, 'SHADOW')) {
        data['@Shadow'] = Reflect.get($0.constructor, 'SHADOW_ATTACH_MODE') || true;
    }

    if (Reflect.get($0.constructor, 'TEMPLATE')) {
        data['@Template'] = Reflect.get($0.constructor, 'TEMPLATE');
    }

    if (Reflect.get($0.constructor, 'COMPONENT_THEME')) {
        data['@ComponentTheme'] = Reflect.get($0.constructor, 'COMPONENT_THEME');
    }

    if (Reflect.get($0.constructor, 'EVENT_ATTRIBUTES')) {
        data['@EventAttribute'] = Reflect.get($0.constructor, 'EVENT_ATTRIBUTES');
    }

    if (Reflect.get($0.constructor, 'OBSERVED_ATTRIBUTES')) {
        data['@Attribute'] = Reflect.get($0.constructor, 'OBSERVED_ATTRIBUTES') || [];

        // show attribute values
        for (let i=0; i<data['@Attribute'].length; i++) {
            data[data['@Attribute'][i]] = $0[data['@Attribute'][i]];
        }
    }

    if (typeof Reflect.get($0.constructor, 'STYLE') === 'function') {
        data['@Style'] = Reflect.get($0.constructor, 'STYLE');
    }

    if (Reflect.get($0, 'VIRTUAL_ELEMENT')) {
        data['$virtualElement'] = Reflect.get($0, 'VIRTUAL_ELEMENT');
    }

    if (Reflect.get($0, 'MAPPED_STATE')) {
        data['$mappedState'] = Reflect.get($0, 'MAPPED_STATE');
    }

    data['$instance'] = $0;

    // SpringType Element data
    window.$ste = data;

    return data;
};

chrome.devtools.panels.elements.createSidebarPane("SpringType Element", (sidebar) => {

    const updateElementProperties = () => {
        sidebar.setExpression("(" + getSelectedSpringTypeElement.toString() + ")()", 'SpringType Element');
    };

    updateElementProperties();

    // TODO: Update data on dynamic change
    // https://stackoverflow.com/questions/17214171/chrome-devtools-extension-how-to-get-selected-element-from-elements-panel-in-co
    // https://developer.mozilla.org/de/docs/Web/API/MutationObserver

    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});
