import { context } from "../../../core/context";

export const CONTEXT_STATE_ASSIGNMENTS: any = 'CONTEXT_STATE_ASSIGNMENTS';

export const contextState = (contextName: string): any => {

  // activate standard context behaviour
  const contextHanderFn = context(contextName);

  return (prototype: any, propName: string) => {

    if (!prototype[CONTEXT_STATE_ASSIGNMENTS]) {
      prototype[CONTEXT_STATE_ASSIGNMENTS] = [];
    }

    // remember context name to add a change listener later
    // before after initial render
    prototype[CONTEXT_STATE_ASSIGNMENTS].push(contextName);

    // actually initialize the context state
    return contextHanderFn(prototype, propName);
  }
};
