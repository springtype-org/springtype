const getApplicationContext = () => {

    const data = {...window.$st.__SPRINGTYPE_APPLICATION_CONTEXT__};

    data.__proto__ = null;

    return data;
};

chrome.devtools.panels.elements.createSidebarPane("SpringType Runtime", (sidebar) => {

    const updateElementProperties = () => {
        sidebar.setExpression("(" + getApplicationContext.toString() + ")()", 'Application Context');
    };

    updateElementProperties();

    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});