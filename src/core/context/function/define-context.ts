import { IContextPropAssignments } from "../interface/icontext-prop-assignments";

export const CONTEXT_ASSIGNMENTS: any = 'CONTEXT_ASSIGNMENTS';

export const defineContext = (prototype: any, propName: string, contextName: string) => {

  if (!prototype[CONTEXT_ASSIGNMENTS]) {
    prototype[CONTEXT_ASSIGNMENTS] = [];
  }

  prototype[CONTEXT_ASSIGNMENTS].push({
    propName,
    contextName
  } as IContextPropAssignments);
}
