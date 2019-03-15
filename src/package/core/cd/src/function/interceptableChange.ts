import {ChangeDetectionInterceptor} from "../../../lang/index";

export const interceptableChange = (
    props: any, 
    name: string | number | symbol, 
    value: any,
    onChange: ChangeDetectionInterceptor,
    onBeforeChange: ChangeDetectionInterceptor,
    instance?: any,
) => {

    const cancelled = !onBeforeChange(props, name, value, instance);

    if (!cancelled) {
        
        props[name] = value;
        
        onChange(props, name, value, instance);
    }
};