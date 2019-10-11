import {download} from "./icon/function/download";
import {iconTypes} from "./icon/iconTypes";
import {mkdirs} from "./icon/function/mkdirs";

interface Theme {
    theme: string;
    linkSuffix: string;
}

const getLinks = (theme: Theme): Array<{ url: string; theme: Theme, type: string }> => {
    return iconTypes.map(type => {
            return {
                type: type,
                url: theme.linkSuffix + type + '/v1/24px.svg',
                theme: theme
            }
        }
    );
};

(async () => {
    const themes: Array<Theme> = [
        {theme: 'filled', linkSuffix: 'http://fonts.gstatic.com/s/i/materialicons/'},
        {theme: 'outlined', linkSuffix: 'http://fonts.gstatic.com/s/i/materialiconsoutlined/'},
        {theme: 'rounded', linkSuffix: 'http://fonts.gstatic.com/s/i/materialiconsround/'},
        {theme: 'two-tone', linkSuffix: 'http://fonts.gstatic.com/s/i/materialiconstwotone/'},
        {theme: 'sharp', linkSuffix: 'http://fonts.gstatic.com/s/i/materialiconssharp/'},
    ];

    for (let theme of themes) {

        let dir = 'download/icon/' + theme.theme;
        mkdirs(dir);
        let success = 0;
        let error = 0;
        let index = 0;
        const objects = getLinks(theme);
        for (let object of objects) {
            try {

                await download(object.url, `${dir}/${object.type}.svg`);
                console.log(success++ +'. downloaded '+ theme.theme + ' '+ object.type);
            } catch (e) {
                error++;
                console.error('failed to download ' + object.url);
            }

        }
        console.log('- downloaded ' + theme.theme + ' ' + success + ' successfully & ' + error + ' failed')
    }
})();


