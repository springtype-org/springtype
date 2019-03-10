import {ComponentReflector} from "../../../../../di";
import {ChangeDetectionInterceptor} from "../../../..";
import {createChangeDetector} from "./createChangeDetector";

export const registerForChangeDetection = (
    prototype: any,
    fieldName: string,
    memorize: boolean,
    onChange: ChangeDetectionInterceptor = (props: any, name: string|number|symbol, value: any) => {},
    onBeforeChange: ChangeDetectionInterceptor = (props: any, name: string|number|symbol, value: any) => true,
) => {

    ComponentReflector.addInitializer(prototype, (instance: any) => {
        createChangeDetector(instance, fieldName, memorize, onChange, onBeforeChange);
    });
};