import {ApplicationContext} from "../../../di";
import {THEME} from "../constant/THEME";

export const registerTheme = (prototype: any, theme: any) => {
    ApplicationContext.getInstance().set(THEME, theme);
};