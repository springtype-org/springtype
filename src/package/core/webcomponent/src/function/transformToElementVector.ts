import {VirtualElement} from "../../../renderer";
import {isFragmentElement} from "./isFragmentElement";

/**
 * Ensure that the destination array have no nested arrays
 */
export const transformToElementVector = (destination: VirtualElement[], tsx: VirtualElement | VirtualElement[] | any) => {

    // in case of top-level ts-fragment, transform up
    if (tsx.name && isFragmentElement(tsx.name)) {
        tsx = tsx.children;
    }

    if (Array.isArray(tsx)) {
        tsx.forEach(tsx => destination.push(tsx));
    } else {
        destination.push(tsx)
    }
};