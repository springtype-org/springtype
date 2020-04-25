import { TYPE_OBJECT } from '../../lang';
import { defineContext } from "../function/define-context";
import { generateContextName } from '../function/generate-context-name';

export const context = (contextNameOrPrototype?: string | any, propName?: string): any => {

  if (typeof contextNameOrPrototype !== TYPE_OBJECT) {

    // @context('some-unique-name') case
    return (prototype: any, propName: string) => {

      //console.log('!!!', prototype, propName!, contextNameOrPrototype)
      // in case contextName is not set, generate a pseudo-unique name
      defineContext(prototype, propName, contextNameOrPrototype);
    };
  } else {

    //console.log('???', contextNameOrPrototype, propName!, generateContextName(contextNameOrPrototype.constructor.name, propName!))

    // @context case
    defineContext(contextNameOrPrototype, propName!, generateContextName(contextNameOrPrototype.constructor.name, propName!));
  }
};
