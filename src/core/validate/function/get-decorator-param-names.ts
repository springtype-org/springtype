export function getDecoratorParamNames(fn: Function) {
  const src = fn.toString().replace(/\/\*.*\*\//, '');
  const pos1 = src.indexOf('(');
  const pos2 = src.indexOf(')');
  const paramSrc = src.substring(pos1 + 1, pos2);
  let params: Array<string> = [];

  if (pos1 === -1) {

      params = [src.split('=>')[0].trim()];

  } else {

      let params_ = paramSrc.split(',');

      for (let i = 0; i < params_.length; ++i) {

          let paramName = params_[i].trim();

          if (paramName) {
              params.push(paramName);
          }
      }
  }
  return params;
}
