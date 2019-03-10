import {Attribute} from "./Attribute";
import {Namespace} from "./Namespace";

export interface NamespaceAttributesMap {
    bind: Array<Attribute>,
    xmlNs: Array<Namespace>,
    event: Array<[string, Function]>,
    property: Array<Attribute>,
    html: Array<Attribute>,
    other: Array<Attribute>,
}