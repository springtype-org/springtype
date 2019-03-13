import {VirtualElement} from "../../../renderer";
import {isFragmentElement} from "./isFragmentElement";

/**
 * Ensure that the destination array have no nested arrays
 */
export const transformToElementVector = (destination: VirtualElement[], tsx: VirtualElement | VirtualElement[] | any) => {

    // in case of ts-fragment
    if (tsx.name && isFragmentElement(tsx.name)) {

        // TODO: Do this in renderer and traverse the whole tree! Atm this is only removing st-fragment on first level
        tsx = tsx.children;
    }

    if (Array.isArray(tsx)) {
        tsx.forEach(tsx => destination.push(tsx));
    } else {
        destination.push(tsx)
    }
};