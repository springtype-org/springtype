const getApplicationContext = () => {

    const data = {...window.$st.APPLICATION_CONTEXT};

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