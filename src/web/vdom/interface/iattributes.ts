import { IRefs } from "../../../core/ref/interface/iref";

export const REF_ATTRIBUTE_NAME = "ref";
export const UNWRAP_ATTRIBUTE_NAME = "unwrap";
export const SLOT_ATTRIBUTE_NAME = "slot";

export interface IAttributes {

  // to unwrap an element (promote children one DOM tree level up)
  unwrap?: boolean;

  // to set a DOM reference for VDOM/component instance binding
  ref?: IRefs;

  // to name a target slot
  slot?: string | string;

  // direct virtual component instance reference, available on mounted "root" DOM elements
  $stComponent?: any;

  // virtual component instance this node belongs/references to (passed down to any sub-node)
  // basically the nearest parent $stComponent in the parent tree
  $stComponentRef?: any;

  // array-local unique key to identify element items in a NodeList
  key?: string;

	// allows to set the CSS class or a list of them
	class?: string | Array<string>;

	// allows to override the DOM tag name
  tag?: string;
}
