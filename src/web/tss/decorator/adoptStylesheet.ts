import { ADOPT_STYLESHEETS } from "../tss";

export const adoptStylesheet = (ref: Promise<string> | string, refName?: string): any => {
  return (targetClass: any) => {
    if (!targetClass[ADOPT_STYLESHEETS]) {
      targetClass[ADOPT_STYLESHEETS] = [];
    }

    targetClass[ADOPT_STYLESHEETS].push({
      ref,
      refName,
    });
  };
};
