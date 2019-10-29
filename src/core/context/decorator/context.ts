import { IContextPropAssignments } from './../interface/icontext-prop-assignments';

export const CONTEXT_ASSIGNMENTS: any = 'CONTEXT_ASSIGNMENTS';

export const context = (contextName: string): any => {

  return (prototype: any, propName: string) => {

    if (!prototype[CONTEXT_ASSIGNMENTS]) {
      prototype[CONTEXT_ASSIGNMENTS] = [];
    }

    prototype[CONTEXT_ASSIGNMENTS].push({
      propName,
      contextName
    } as IContextPropAssignments);
  };
};
