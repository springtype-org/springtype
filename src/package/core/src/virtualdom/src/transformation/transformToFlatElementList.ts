import {VirtualElement} from "../../index";

export const transformToFlatElementList = (destination: Array<VirtualElement>, tsx: VirtualElement | Array<VirtualElement> | any) => {

    if (Array.isArray(tsx)) {
        tsx.forEach(tsx => destination.push(tsx));
    } else {
        destination.push(tsx)
    }
};