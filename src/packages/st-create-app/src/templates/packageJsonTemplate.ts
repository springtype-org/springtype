export const packageJsonTemplate = (appName: string) => ({
    name: appName,
    version: '0.1.0',
    private: true,
    "scripts": {
        "clean": "npx rimraf dist .cache",
        "start": "npx parcel src/index.html",
        "build": "cross-env NODE_ENV=production parcel build src/index.html --public-url ."
    },
});
