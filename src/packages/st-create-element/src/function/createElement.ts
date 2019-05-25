import {validateElementName} from "./validateElementName";
import {validateIsSpringTypeProject} from "../../../cli-common/src/function/validateIsSpringTypeProject";
import {packageJsonTemplate} from "../../../st-create-app/src/templates/packageJsonTemplate";
import {tsConfigTemplate} from "../../../st-create-app/src/templates/tsConfigTemplate";
import {indexHtmlTemplate} from "../../../st-create-app/src/templates/indexHtmlTemplate";
import {elementTemplate} from "../../../cli-common/src/template/elementTemplate";
import {tplTemplate} from "../../../cli-common/src/template/tplTemplate";
import {styleTemplate} from "../../../cli-common/src/template/styleTemplate";

const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const chalk = require('chalk');

export const createElement = async(elementName: string, tpl: string = '', style: any = {}) => {

    return new Promise((resolve, reject) => {

        validateElementName(elementName);
        validateIsSpringTypeProject();

        console.log(`Creating element ${chalk.green(elementName)}.`);
        console.log();

        const isPage = elementName.indexOf('page') > -1;
        const rootDir = process.cwd();

        fs.ensureDirSync(path.join(rootDir, 'src'));

        const subDir = isPage ? 'page' : 'element';

        // src/element or src/page
        fs.ensureDirSync(path.join(rootDir, 'src', subDir));

        // src/element/element-name or src/page/element-name-page
        fs.ensureDirSync(path.join(rootDir, 'src', subDir, elementName));

        // write element.tsx
        fs.writeFileSync(
            path.join(rootDir, 'src', subDir, elementName, elementName + '.tsx'),
            elementTemplate(elementName) + os.EOL
        );

        // create element.tpl.tsx
        fs.writeFileSync(
            path.join(rootDir, 'src', subDir, elementName, elementName + '.tpl.tsx'),
            tplTemplate(elementName, tpl) + os.EOL
        );

        // create element.style.tsx
        fs.writeFileSync(
            path.join(rootDir, 'src', subDir, elementName, elementName + '.style.tsx'),
            styleTemplate(elementName, style) + os.EOL
        );

        resolve();
    });
};