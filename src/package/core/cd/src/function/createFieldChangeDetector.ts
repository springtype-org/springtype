import {ChangeDetectionInterceptor} from "../../../lang/index";
import {createChangeDetector} from "./createChangeDetector";

export const createFieldChangeDetector = (
    instance: any,
    fieldName: string|symbol,
    memorize: boolean,
    onChange: ChangeDetectionInterceptor = (props: any, name: string|number|symbol, value: any) => {},
    onBeforeChange: ChangeDetectionInterceptor = (props: any, name: string|number|symbol, value: any) => true,
) => {

    instance[fieldName] = createChangeDetector({
        ...instance[fieldName]
    }, memorize, onChange, onBeforeChange, instance);

    // make property immutable so it can't loose change detection
    // in case of instance[fieldName] = someThingElse but throws
    Object.defineProperty(instance, fieldName, {
        writable: false
    });
};