const getSelectedSpringTypeElement = () => {
    const data = {__proto__: null};


    if (Reflect.get($0.constructor, 'TAG_NAME')) {
        data['@Element'] = Reflect.get($0.constructor, 'TAG_NAME');
    }

    if (Reflect.get($0.constructor, 'SHADOW')) {
        data['@Shadow'] = true;
    }

    if (Reflect.get($0.constructor, 'SHADOW_ATTACH_MODE')) {
        data['@Shadow AttachMode'] = Reflect.get($0.constructor, 'SHADOW_ATTACH_MODE');
    }

    if (Reflect.get($0.constructor, 'TEMPLATE')) {
        data['@Template'] = Reflect.get($0.constructor, 'TEMPLATE');
    }

    if (Reflect.get($0.constructor, 'COMPONENT_THEME')) {
        data['@ComponentTheme'] = Reflect.get($0.constructor, 'COMPONENT_THEME');
    }

    if (Reflect.get($0.constructor, 'EVENT_ATTRIBUTES')) {
        data['@EventAttribute list'] = Reflect.get($0.constructor, 'EVENT_ATTRIBUTES');
    }

    if (Reflect.get($0.constructor, 'OBSERVED_ATTRIBUTES')) {
        data['@Attribute list'] = Reflect.get($0.constructor, 'OBSERVED_ATTRIBUTES');
    }

    if (typeof Reflect.get($0.constructor, 'STYLE') === 'function') {
        data['@Style'] = Reflect.get($0.constructor, 'STYLE');
    }

    window.$st = data;
    return data;
};

const getSelectedSpringTypeElementStyle = () => {

    const styles = {__proto__: null};

    if (typeof Reflect.get($0.constructor, 'STYLE') === 'function') {

        if (Reflect.get($0.constructor, 'SHADOW') &&
            Reflect.get($0.constructor, 'SHADOW_ATTACH_MODE') === 'open') {

            Array.prototype.slice.apply($0.shadowRoot.styleSheets[0].cssRules)
                .forEach(x => { styles[x.selectorText] = x.cssText });

        } else if (!Reflect.get($0.constructor, 'SHADOW')) {

            for (let i=0; i<document.styleSheets.length; i++) {
                if ($0.querySelector('style') === document.styleSheets[i].ownerNode) {

                    Array.prototype.slice.apply(document.styleSheets[i].cssRules)
                        .forEach(cssRule => {

                            styles[cssRule.selectorText] = {__proto__: null};

                            for (let j=0; j<cssRule.styleMap.size; j++) {
                                styles[cssRule.selectorText][cssRule.style[j]] = cssRule.style[cssRule.style[j]];
                            }
                    });
                }
            }

        } else if (
            Reflect.get($0.constructor, 'SHADOW') &&
            Reflect.get($0.constructor, 'SHADOW_ATTACH_MODE') === 'closed') {
            styles['Warning'] = 'This Element is attached in closed Shadow DOM mode. Style is not exposed.';

        } else {
            styles['Error'] = 'This Element has a style function but is not conform to the Element API.'
        }
    } else {
        styles['Info'] = 'This Element has no @Style(styleSheet) decoration.';
    }
    return styles
};

chrome.devtools.panels.elements.createSidebarPane("SpringType Element", (sidebar) => {

    const updateElementProperties = () => {
        sidebar.setExpression("(" + getSelectedSpringTypeElement.toString() + ")()", 'SpringType Element');
    };

    updateElementProperties();

    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});

chrome.devtools.panels.elements.createSidebarPane("SpringType Style", (sidebar) => {

    const updateElementProperties = () => {
        sidebar.setExpression("(" + getSelectedSpringTypeElementStyle.toString() + ")()", 'SpringType Style');
    };

    updateElementProperties();

    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});