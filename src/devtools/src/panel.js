const runCode = function(src, done) {

    chrome.devtools.inspectedWindow.eval(src, function(res, err) {
        if (err) {
            console.log(err);
        }

        if (typeof done === 'function') {
            done(res);
        }
    });
};

const IS_CHROME = navigator.userAgent.indexOf('Firefox') < 0;

if (IS_CHROME) {
    browserName = 'Chrome';

    // chrome.devtools.panels added in Chrome 18.
    // chrome.devtools.panels.themeName added in Chrome 54.
    themeName = chrome.devtools.panels.themeName === 'dark'
        ? 'ChromeDark'
        : 'ChromeDefault';
} else {
    browserName = 'Firefox';
    themeName = 'FirefoxLight';

    // chrome.devtools.panels.themeName added in Firefox 55.
    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.panels/themeName
    if (chrome.devtools && chrome.devtools.panels) {
        switch (chrome.devtools.panels.themeName) {
            case 'dark':
                themeName = 'FirefoxDark';
                break;
            case 'firebug':
                themeName = 'FirefoxFirebug';
                break;
        }
    }
}

const renderPerformanceTable = () => {

    runCode('JSON.stringify(window.$st.MEASURE_PERFORMANCE_CALL_TIME_AVERAGE)', (performanceDataText) => {

        const performanceData = JSON.parse(performanceDataText) || {};

        runCode('JSON.stringify(window.$st.MEASURE_PERFORMANCE_CALL_AMOUNT)', (callAmountDataText) => {

            const callAmountData = JSON.parse(callAmountDataText) || {};

            const table = document.querySelector('#measuredPerformance');

            const tableHead = `<thead>
                <tr>
                    <td>Name</td>
                    <td>Avg. execution time (ms)</td>
                    <td>Calls #</td>
                </tr>
            </thead>`;

            let tableRows = '';

            for (let fnName in performanceData) {
                tableRows += `<tr>
                    <td><code>${fnName}</code></td>
                    <td><code>${performanceData[fnName]}</code></td>
                    <td><code>${callAmountData[fnName]}</code></td>
                </tr>`;
            }

            table.innerHTML = `${tableHead}<tbody>${tableRows}</tbody>`
        });
    });

};

setInterval(() => {
    renderPerformanceTable();
}, 1000);

renderPerformanceTable();


