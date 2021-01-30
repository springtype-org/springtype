import { Ref } from "./ref";

export const REF_ATTRIBUTE_NAME = "ref";

export interface IAttributes {

  // typing; detect ref
  ref?: Ref;
  
  // array-local unique key to identify element items in a NodeList
  key?: string;

	// allows to override the DOM tag name
  tag?: string;
}
