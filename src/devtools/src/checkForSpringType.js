module.exports = function(done) {
    chrome.devtools.inspectedWindow.eval(`!!(
    (window.$st)
  )`, function(pageHasSpringType, err) {
        done(pageHasSpringType);
    });
};