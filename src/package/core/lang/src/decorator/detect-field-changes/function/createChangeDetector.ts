import * as _ from "lodash";
import {interceptableChange} from "./interceptableChange";
import {ChangeDetectionInterceptor} from "../../../../index";

export const createChangeDetector = (
    initialValue: any,
    memorize: boolean,
    onChange: ChangeDetectionInterceptor = (instance: any, name: string|number|symbol, value: any) => {},
    onBeforeChange: ChangeDetectionInterceptor = (instance: any, name: string|number|symbol, value: any) => true,
) => {

    return new Proxy(initialValue, {
        set: (props: any, name: string | number | symbol, value: any): boolean => {

            if (memorize) {

                if (!_.isEqual(props[name], value)) {
                    interceptableChange(props, name, value, onChange, onBeforeChange);
                }

            } else {
                interceptableChange(props, name, value, onChange, onBeforeChange);
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