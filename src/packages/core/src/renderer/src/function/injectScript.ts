export const injectScript = (src: string, name: string) => {

    return new Promise((resolve) => {

        const script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;

        // internet explorer
        if (script.readyState) {
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {
            script.onload = () => {
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
    });
};