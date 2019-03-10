import {ChangeDetectionInterceptor} from "../../../../index";
import {interceptableChange} from "./interceptableChange";
import * as _ from "lodash";

export const createChangeDetector = (
    instance: any,
    fieldName: string,
    memorize: boolean,
    onChange: ChangeDetectionInterceptor = (props: any, name: string|number|symbol, value: any) => {},
    onBeforeChange: ChangeDetectionInterceptor = (props: any, name: string|number|symbol, value: any) => true,
) => {

    instance[fieldName] = new Proxy({}, {
        set: (props: any, name: string | number | symbol, value: any): boolean => {

            if (memorize) {

                if (!_.isEqual(props[name], value)) {
                    interceptableChange(props, name, value, onChange, onBeforeChange);
                }

            } else {
                interceptableChange(props, name, value, onChange, onBeforeChange);
            }
            return true;
        }
    });

    // make property immutable so it can't loose change detection
    // in case of instance[fieldName] = someThingElse but throws
    Object.defineProperty(instance, fieldName, {
        writable: false
    });
};