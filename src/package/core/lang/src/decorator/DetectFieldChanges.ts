import {registerForChangeDetection} from "./detect-field-changes/function/registerForChangeDetection";
import {ChangeDetectionInterceptor} from "./detect-field-changes/interface/ChangeDetectionInterceptor";

export function DetectFieldChanges(
    fieldName: string,
    memorize: boolean = true,
    onChange: ChangeDetectionInterceptor = (props: any, name: string|number|symbol, value: any) => {},
    onBeforeChange: ChangeDetectionInterceptor = (props: any, name: string|number|symbol, value: any) => { return true },
): any {

    // called with @DetectFieldChanges(...)
    return (target: any) => {
        registerForChangeDetection(target, fieldName, memorize, onChange, onBeforeChange);
        return target;
    }
}