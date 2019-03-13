import {ApplicationContext, ComponentImpl, ComponentReflector} from "../../../di";
import {Store} from "../Store";
import {createChangeDetector} from "../../../lang/src/decorator/detect-field-changes/function/createChangeDetector";

export function MapStateToField(
    mapFn: (state: any) => any,
    updateWebComponent: boolean = true
): any {

    const doMapToInstanceProps = (instance: any, propsFieldName: string, value: any) => {

        const props = instance[propsFieldName];

        for (let key in value) {

            if (value.hasOwnProperty(key)) {
                props[key] = value[key];
            }
        }
    };

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

            argumentValue = createChangeDetector(
                argumentValue,
                true,
                (props: any, name: string|number|symbol, value: any) => {
                    instances.forEach((instance) => {
                        if (updateWebComponent && (<any>instance).propsField) {
                            doMapToInstanceProps(instance, (<any>instance).propsField, argumentValue);
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