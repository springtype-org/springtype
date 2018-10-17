export function getParamNames(fn: Function) {
    let src = fn.toString().replace(/\/\*.*\*\//, '');
    let params = [];
    let pos1 = src.indexOf('(');
    let pos2 = src.indexOf(')');
    let paramSrc = src.substring(pos1 + 1, pos2);

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
