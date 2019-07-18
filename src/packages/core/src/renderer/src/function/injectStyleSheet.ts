export const injectStyleSheet = (href: string, name: string) => {

    return new Promise((resolve) => {

        const stylesheet: any = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = href;

        // internet explorer
        if (stylesheet.readyState) {
            stylesheet.onreadystatechange = () => {
                if (stylesheet.readyState === "loaded" || stylesheet.readyState === "complete") {
                    stylesheet.onreadystatechange = null;
                    resolve({stylesheet: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {
            stylesheet.onload = () => {
                resolve({stylesheet: name, loaded: true, status: 'Loaded'});
            };
        }
        stylesheet.onerror = (error: any) => resolve({stylesheet: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
    });
};