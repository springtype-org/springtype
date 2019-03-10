import {ApplicationContext} from "../../../di";
import {APP_THEME} from "../constant/APP_THEME";

export const registerTheme = (prototype: any, theme: any) => {
    ApplicationContext.getInstance().set(APP_THEME, theme);
};