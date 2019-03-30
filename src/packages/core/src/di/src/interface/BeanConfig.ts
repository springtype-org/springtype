import {ComponentImpl} from "./ComponentImpl";

export interface BeanConfig<T extends ComponentImpl<any>> {

    // reference to the component that should be used in test
    mockedBy?: T;
}