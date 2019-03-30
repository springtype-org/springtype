import {setTheme} from "../context/theme";

export function Theme(theme: any): any {

    // called with @Theme() or @Theme({ ... })
    if (!(typeof theme === 'function')) {

        return (target: any) => {
            setTheme(target, theme);
            return target;
        }
    }
}