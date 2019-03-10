import {registerForChangeDetection} from "./detect-field-changes/function/registerForChangeDetection";
import {ChangeDetectionInterceptor} from "./detect-field-changes/interface/ChangeDetectionInterceptor";

export function DetectFieldChanges(
    fieldName: string,
    memorize: boolean = true,
    onChange?: ChangeDetectionInterceptor,
    onBeforeChange?: ChangeDetectionInterceptor,
): any {

    // called with @ChangeDetector(...)
    return (target: any) => {
        registerForChangeDetection(target, fieldName, memorize, onChange, onBeforeChange);
        return target;
    }
}