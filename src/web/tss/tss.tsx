import { st } from "../../core";
import { GlobalCache } from "../../core/st/interface/i$st";
import { ILifecycle, RenderReason } from "../customelement/interface/ilifecycle";

if (!st.tss) {
  st.tss = {
    currentTheme: {},

    /**
     * Sets a new theme and re-renders the style of all web component instances
     * @param theme Arbitrary object containing theme style information
     */
    setTheme(theme: any) {
      st.tss.currentTheme = theme || {};

      for (let instance of st[GlobalCache.CUSTOM_ELEMENT_INSTANCES] || []) {
        if ((instance as ILifecycle).shouldRender!(RenderReason.THEME_CHANGE)) {
          (instance as ILifecycle).doRender!(true /*tssOnly*/);
        }
      }
    },
  };
}
export const css = (literals: TemplateStringsArray, ...placeholders: string[]) => {
  let result = "";

  for (let i = 0; i < placeholders.length; i++) {
    result += literals[i];
    result += placeholders[i];
  }
  result += literals[literals.length - 1];
  return result;
};
