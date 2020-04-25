export const immediate = (fn: Function) => {
  return function () {
    const delegate = () => fn.apply(
      // @ts-ignore
      this, arguments);
    setImmediate(delegate);
  }
}
