export const delay = (fn: Function, ms: number) => {
  return function () {
    const delegate = () => fn.apply(
      // @ts-ignore
      this, arguments);
    setTimeout(delegate, ms);
  }
}
