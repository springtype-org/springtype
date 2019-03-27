const getSelectedSpringTypeElementStyle = () => {

    const styles = {__proto__: null};

    if (typeof Reflect.get($0.constructor, 'STYLE') === 'function') {

        if (Reflect.get($0.constructor, 'SHADOW') &&
            (!Reflect.get($0.constructor, 'SHADOW_ATTACH_MODE') || Reflect.get($0.constructor, 'SHADOW_ATTACH_MODE') === 'open')) {

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

chrome.devtools.panels.elements.createSidebarPane("SpringType Style", (sidebar) => {

    const updateElementProperties = () => {
        sidebar.setExpression("(" + getSelectedSpringTypeElementStyle.toString() + ")()", 'SpringType Style');
    };

    updateElementProperties();

    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});