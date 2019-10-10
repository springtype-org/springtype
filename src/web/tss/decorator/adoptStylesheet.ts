export const ADOPT_STYLESHEETS = "ADOPT_STYLESHEETS";

export interface IAdoptedStyleSheet {
  ref: Promise<string>;
  refName: string;
}

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
