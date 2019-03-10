import {ComponentReflector} from "../../../../../di";
import {ChangeDetectionInterceptor} from "../../../..";
import {createFieldChangeDetector} from "./createFieldChangeDetector";

export const registerForChangeDetection = (
    prototype: any,
    fieldName: string,
    memorize: boolean,
    onChange: ChangeDetectionInterceptor = (instance: any, name: string|number|symbol, value: any) => {},
    onBeforeChange: ChangeDetectionInterceptor = (instance: any, name: string|number|symbol, value: any) => true,
) => {

    ComponentReflector.addInitializer(prototype, (instance: any) => {
        createFieldChangeDetector(instance, fieldName, memorize, onChange, onBeforeChange);
    });
};