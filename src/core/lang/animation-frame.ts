export const animationFrame = (fn: Function) => {
  return function () {
    const delegate = () => fn.apply(
      // @ts-ignore
      this, arguments);
    requestAnimationFrame(delegate);
  }
}
