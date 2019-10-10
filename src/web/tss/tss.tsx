import { st } from "../../core";
import { GlobalCache } from "../../core/st/interface/i$st";
import { ILifecycle, RenderReason } from "../customelement/interface/ilifecycle";
import { tsx } from "../vdom";
import { IVirtualNode } from "../vdom/interface";
import { IAdoptedStyleSheet } from "./decorator/adoptStylesheet";
import M = require("minimatch");

const camelToKebabCase = (name: string): string => {
  return name.replace(/[A-Z]/g, g => "-" + g[0].toLowerCase());
};

if (!st.tss) {
  st.tss = {
    currentTheme: {},

    globalStyles: {},

    cssStyleSheets: {},

    headStyleSheets: null,

    generateStyleDeclaration: (declaration: any, mediaQuery: boolean = false) => {
      let styles = "";

      for (let selector in declaration) {
        if (declaration.hasOwnProperty(selector)) {
          if (selector.indexOf("@media") === 0) {
            styles = `${styles}\n\n${selector} {${st.tss.generateStyleDeclaration(declaration[selector], true)}    \n}\n\n`;
          } else {
            let styleMapping = "";

            for (let property in declaration[selector]!) {
              if (declaration[selector]!.hasOwnProperty(property)) {
                let styleValue = (declaration[selector] as any)[property];

                // uniform to array (multiple values for one CSS property)
                if (!Array.isArray(styleValue)) {
                  styleValue = [styleValue];
                }

                for (let i = 0; i < styleValue.length; i++) {
                  styleMapping = `${styleMapping}\n    ${mediaQuery ? "    " : ""}${
                    camelToKebabCase(property) // selector
                  }: ${styleValue[i]};`;
                }
              }
            }
            styles = `${styles} \n\n${mediaQuery ? "    " : ""}${selector} {\n${mediaQuery ? "        " : "    "}${styleMapping}\n${mediaQuery ? "    " : ""}}`;
          }
        }
      }
      return styles;
    },

    getDeclaration: (instance: any, tssFn?: Function, renderStyleFn?: Function): any => {
      // use renderStyle() function return value if function is defined
      let declaration = typeof renderStyleFn == "function" ? renderStyleFn(st.tss.currentTheme) : null;

      // else use style template (bound in @CustomElement({ tss: ... }))
      if (!declaration) {
        declaration = typeof tssFn == "function" ? tssFn(instance, st.tss.currentTheme) : null;
      }
      return declaration || undefined;
    },

    renderStyleSheet: (declaration: any): CSSStyleSheet => {
      const stylesheet = new CSSStyleSheet();
      stylesheet.replace(st.tss.generateStyleDeclaration(declaration));
      return stylesheet;
    },

    renderStyleNode: (declaration: any): IVirtualNode => {
      return <style type="text/css">{st.tss.generateStyleDeclaration(declaration)}</style>;
    },

    setTheme(theme: any) {
      st.tss.currentTheme = theme || {};

      for (let instance of st[GlobalCache.CUSTOM_ELEMENT_INSTANCES] || []) {
        if ((instance as ILifecycle).shouldRender!(RenderReason.THEME_CHANGE)) {
          (instance as ILifecycle).doRender!(true /*tssOnly*/);
        }
      }
    },

    async addHeadStyleSheets(adoptedStyleSheets: Array<IAdoptedStyleSheet>): Promise<void> {
      for (let styleSheet of adoptedStyleSheets) {
        // cache optimization
        if (styleSheet.refName && st.tss.globalStyles[styleSheet.refName]) return;

        const style = document.createElement("style");
        style.type = "text/css";

        if (process.env.NODE_ENV == "development" && styleSheet.refName) {
          style.setAttribute("refName", styleSheet.refName);
        }

        style.appendChild(document.createTextNode(await styleSheet.ref));
        document.head.appendChild(style);

        // cache
        st.tss.globalStyles[styleSheet.refName] = style;
      }
    },

    async getShadowStyleSheets(adoptedStyleSheets: Array<IAdoptedStyleSheet>): Promise<Array<CSSStyleSheet>> {
      const cssStyleSheets = [];

      for (let styleSheet of adoptedStyleSheets) {
        // cache optimization
        if (styleSheet.refName && st.tss.cssStyleSheets[styleSheet.refName]) {
          cssStyleSheets.push(st.tss.cssStyleSheets[styleSheet.refName]);
          continue;
        }
        const cssStyleSheet = new CSSStyleSheet();
        cssStyleSheet.replace(await styleSheet.ref);

        // cache
        st.tss.cssStyleSheets[styleSheet.refName] = cssStyleSheet;

        cssStyleSheets.push(cssStyleSheet);
      }
      return cssStyleSheets;
    },
  };
}
