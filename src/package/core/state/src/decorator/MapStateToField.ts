import {ApplicationContext, ComponentImpl, ComponentReflector} from "../../../di";
import {Store} from "../Store";
import {createChangeDetector} from "../../../lang/src/decorator/detect-field-changes/function/createChangeDetector";
import {WebComponentLifecycle} from "../../../webcomponent";
import {WebComponentImpl} from "../../../webcomponent/src/interface/WebComponentImpl";

export function MapStateToField(
    mapFn: (state: any) => any,
    callReflowOnAttributeChange: boolean = true
): any {

    // called with @MapStateToField(...)
    return (targetClass: any, methodName: string, argumentIndex: number) => {

        const store: Store<any> = ApplicationContext.getInstance().getBean(Store);
        const instances: Array<ComponentImpl<any>> = [];

        ComponentReflector.addInitializer(targetClass, (instance: any) => {
            instances.push(instance);
        });

        const updateField = (argumentValue: any) => {

            const mappedState = mapFn(store.getState());
            for (let key in mappedState) {
                if (mappedState.hasOwnProperty(key)) {
                    argumentValue[key] = mappedState[key];
                }
            }
        };

        const createField = (argumentValue: any) => {

            let oldMappedState: any;

            argumentValue = createChangeDetector(
                argumentValue,
                true,
                (props: any, name: string|number|symbol, value: any) => {
                    instances.forEach((instance) => {

                        if (callReflowOnAttributeChange) {
                            (instance as any).reflowOnAttributeChange(name, oldMappedState, value);
                            oldMappedState = value;
                        }
                    })
            });

            updateField(argumentValue);

            return argumentValue;
        };

        ComponentReflector.addConstructorArgumentInitializer(targetClass, (argumentValue) => {

            const field = createField(argumentValue);

            store.subscribe(() => {
                updateField(field);
            });

            return field;

        }, argumentIndex);

        return targetClass;
    }
}