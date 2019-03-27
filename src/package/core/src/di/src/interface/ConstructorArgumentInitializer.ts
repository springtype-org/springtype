import {ConstructorArgumentInitializerFunction} from "./ConstructorArgumentInitializerFunction";

export interface ConstructorArgumentInitializer {
    initializer: ConstructorArgumentInitializerFunction;
    argumentIndex: number;
}