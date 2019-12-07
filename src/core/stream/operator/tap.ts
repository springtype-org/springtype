export const tap = (fn: Function) => {
  return (value: any) => {
    fn(value);
    return value;
  }
}
