export const CONTEXT_CHANGE_ASSIGNMENTS = 'CONTEXT_CHANGE_ASSIGNMENTS';
export const CONTEXT_CHANGE_PATH_WILDCARD = '*';

export function onContextChange(contextName: string, path?: string): any {

  return function (target: any, propertyKey: string) {

    if (!target[CONTEXT_CHANGE_ASSIGNMENTS]) {
      target[CONTEXT_CHANGE_ASSIGNMENTS] = {};
    }

    target[CONTEXT_CHANGE_ASSIGNMENTS][contextName] = {
      methodName: propertyKey,
      path: path ? path : CONTEXT_CHANGE_PATH_WILDCARD
    };
  }
}
