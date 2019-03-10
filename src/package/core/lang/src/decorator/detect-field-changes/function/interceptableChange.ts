import {ChangeDetectionInterceptor} from "../../../..";

export const interceptableChange = (
    props: any, 
    name: string | number | symbol, 
    value: any,
    onChange: ChangeDetectionInterceptor,
    onBeforeChange: ChangeDetectionInterceptor,
) => {

    const cancelled = !onBeforeChange(props, name, value);

    if (!cancelled) {
        
        props[name] = value;
        
        onChange(props, name, value);
    }
};