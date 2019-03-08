import {ApplicationContext} from "../../../di";

export interface ThemeTargetObject<TTO> {
    new(...args: any[]): TTO;
}

export const CONTEXT_THEME = Symbol("CONTEXT_THEME");

const registerTheme = (prototype: any, theme: any) => {
    ApplicationContext.getInstance().set(CONTEXT_THEME, theme);
};

export function Theme<TTO extends ThemeTargetObject<any>>(theme: any): TTO|any {

    // called with @Theme() or @Theme({ ... })
    if (!(typeof theme === 'function')) {

        return (target: any) => {
            registerTheme(target, theme);
            return target;
        }
    }
}