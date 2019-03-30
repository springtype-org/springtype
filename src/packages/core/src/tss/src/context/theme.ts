import {ApplicationContext} from "../../../di";

const THEME = "THEME";

export const setTheme = (prototype: any, theme: any) => {
    ApplicationContext.getInstance().set(THEME, theme);
};

export const getTheme = (): any => ApplicationContext.getInstance().get(THEME);