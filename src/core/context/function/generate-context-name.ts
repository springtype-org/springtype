export const CONTEXT_NAME_SEPARATOR = '@$@';

export const generateContextName = (className: string, propName: string) => {
  return `${className}${CONTEXT_NAME_SEPARATOR}${propName}`;
}
