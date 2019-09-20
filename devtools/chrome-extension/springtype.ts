import {bundle} from "@springtype/bundle";
import {copyPathOrFile} from "st-cp";
import {removePathOrFile} from "st-rm-rf";



(async () => {
    await removePathOrFile('dist');
    await removePathOrFile('dist-background');

    await bundle({
        "entry": "src/extension.tsx",
        "webIndex": {
            "template": "src/index.html"
        }
    });

    await bundle({
        "entry": "src/background.ts",
        output: 'dist-background',
        useSingleBundle: true,
        "devServer": {
            enabled: false
        },
        "webIndex": {
            enabled: false
        }
    });


    await copyPathOrFile('dist-background/app.js', 'dist/background.js', true);
    await copyPathOrFile('dist-background/app.js.map', 'dist/background.js.map', true);

    await copyPathOrFile('manifest.json', 'dist/manifest.json', true);
    await copyPathOrFile('assets', 'dist/assets', true);

    await removePathOrFile('dist-background');


})();


