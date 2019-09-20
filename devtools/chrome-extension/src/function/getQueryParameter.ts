export interface IQueryParameters {
    [key: string]: string | string[];
}

export const getQueryParameter = (parameterName: string): string | string[] => {
    const queryParams = getQueryParameters();
    return queryParams[parameterName];
};

export const getQueryParameters = (): IQueryParameters => {
    const parameters: IQueryParameters = {};
    const queryParams = document.location.search.substr(1);

    queryParams.split('?').map(param => {
            const paramPair = param.split('=');
            const paramName = paramPair[0];
            const paramValue = paramPair[1];

            if (Object.keys(parameters).indexOf(paramName) > 0) {
                const parameterValue = parameters[paramName];
                if (Array.isArray(parameterValue)) {
                    parameterValue.push(paramValue);
                } else {
                    parameters[paramName] = [parameterValue,paramValue];
                }
            } else {
                parameters[paramName] = paramValue;
            }
        }
    );
    return parameters;
};