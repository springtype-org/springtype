export const store = (path: string): any => {
  return (prototype: any) => {
    console.log('@store on', prototype, path);
  };
};
