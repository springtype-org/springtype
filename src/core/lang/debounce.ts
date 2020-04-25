export const debounce = (fn: Function, ms: number) => {
  let timeout: any;

  return function () {
    const delegate = () => fn.apply(
      // @ts-ignore
      this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(delegate, ms);
  }
}
