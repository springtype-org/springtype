import { ChangeType } from './../../../core/cd/interface/change-type';

export enum RenderReason {
  INITIAL = "INITIAL",
  STATE_CHANGE = "STATE_CHANGE",
  ATTRIBUTE_CHANGE = "ATTRIBUTE_CHANGE",
  THEME_CHANGE = "THEME_CHANGE",
  CHILDREN_UPDATE = "CHILDREN_UPDATE"
}

export interface RenderReasonMetaData {
  // prop or attribute name
  name: string;
  // only in case of prop and deep change
  path: string;
  // only in case of prop change
  type?: ChangeType;
  // new value
  value: any;
  // previous value
  prevValue: any;
}
