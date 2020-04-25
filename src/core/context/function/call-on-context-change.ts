import { IContextChange } from "../interface/icontext-change-handler";
import { CONTEXT_CHANGE_ASSIGNMENTS, CONTEXT_CHANGE_PATH_WILDCARD } from "../decorator/on-context-change";
import { ChangeType } from "../../cd/interface/change-type";
import { CONTEXT_NAME_SEPARATOR } from "./generate-context-name";

export const callOnContextChange = (change: IContextChange, instance: any) => {

  const prototype = Object.getPrototypeOf(instance);

  if (!prototype[CONTEXT_CHANGE_ASSIGNMENTS]) return;

  // walk thru @onContextChange assignments
  for (const contextName in prototype[CONTEXT_CHANGE_ASSIGNMENTS]) {

    // case of pseudo-unique generated context name:
    // developer uses property name for identification (e.g. @onContextChange('person', 'firstName'))
    // but internally the context is named "SomeClass@$@person"
    if (change.name.indexOf(CONTEXT_NAME_SEPARATOR) > -1 &&
      contextName !== change.name.split(CONTEXT_NAME_SEPARATOR)[1]) {
      continue;
    } else if (
      change.name.indexOf(CONTEXT_NAME_SEPARATOR) == -1 &&
      change.name !== contextName) {
      continue;
    }

    const targetPath = prototype[CONTEXT_CHANGE_ASSIGNMENTS][contextName].path;
    const targetMethodName = prototype[CONTEXT_CHANGE_ASSIGNMENTS][contextName].methodName;

    if ((targetPath !== CONTEXT_CHANGE_PATH_WILDCARD &&
      targetPath === change.path) || targetPath === CONTEXT_CHANGE_PATH_WILDCARD) {

      // refernece changes are assignments; this hook is for changes only
      if (change.type === ChangeType.DEEP) {

        // call change handler method
        instance[targetMethodName].call(instance, change.value, change.prevValue);
      }
    }
  }
}
