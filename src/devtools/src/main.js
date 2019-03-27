var panelCreated = false;

function createPanelIfSpringTypeLoaded() {
    if (panelCreated) {
        return;
    }
    chrome.devtools.inspectedWindow.eval(`!!((window.$st))`, function(pageHasSpringType, err) {
        if (!pageHasSpringType || panelCreated) {
            return;
        }

        clearInterval(loadCheckInterval);
        panelCreated = true;
        chrome.devtools.panels.create('SpringType', '', 'panel.html', function(panel) {
            var stPanel = null;
            panel.onShown.addListener(function(window) {
                stPanel = window.panel;
            });
            panel.onHidden.addListener(function() {
                if (stPanel) {
                }
            });
        });

        setIconAndPopup('development');
    });
}

function setIconAndPopup(buildType) {
    chrome.browserAction.setIcon({
        tabId: chrome.devtools.inspectedWindow.tabId,
        path: {
            '16': 'icons/icon16_' + buildType + '.png',
            '32': 'icons/icon32_' + buildType + '.png',
            '48': 'icons/icon48_' + buildType + '.png',
            '128': 'icons/icon128_' + buildType + '.png',
        },
    });
    chrome.browserAction.setPopup({
        tabId: chrome.devtools.inspectedWindow.tabId,
        popup: 'popups/' + buildType + '.html',
    });
}

chrome.devtools.network.onNavigated.addListener(function() {
    createPanelIfSpringTypeLoaded();
});

var loadCheckInterval = setInterval(function() {
    createPanelIfSpringTypeLoaded();
}, 1000);

createPanelIfSpringTypeLoaded();