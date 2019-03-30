import {interceptableChange} from "./interceptableChange";
import {ChangeDetectionInterceptor} from "../interface/ChangeDetectionInterceptor";
import {Comparator} from "../../../lang/src/object/Comparator";

export const createChangeDetector = (
    initialValue: any,
    memorize: boolean,
    onChange: ChangeDetectionInterceptor = (instance: any, name: string|number|symbol, value: any) => {},
    onBeforeChange: ChangeDetectionInterceptor = (instance: any, name: string|number|symbol, value: any) => true,
    instance?: any
): any => {

    return new Proxy(initialValue, {
        set: (props: any, name: string | number | symbol, value: any): boolean => {

            if (memorize) {

                if (!Comparator.isEqual(props[name], value)) {
                    interceptableChange(props, name, value, onChange, onBeforeChange, instance);
                }

            } else {
                interceptableChange(props, name, value, onChange, onBeforeChange, instance);
            }
            return true;
        },
        getPrototypeOf() {
            return {
                isChangeDetector: true
            };
        }
    });
};