import {TemplateStringStyleSheet} from "@springtype/core";

export const style = (): TemplateStringStyleSheet => ({

    // template string based styling
    '.todo-item': `
          cursor: pointer;
          background-color: #efefef;
          border-bottom: 1px solid #ccc;
          padding-left: 20px;
          padding-right: 20px;
    `,

    '.todo-item:hover': {
        'background-color': '#ddd'
    },
});