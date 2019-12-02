export const castIntrinsic = (value: string): string|number|boolean => {

  // boolean early return
  if (value == 'true') return true;
  if (value == 'false') return false;

  const charCode0 = value.charCodeAt(0);
  const charCode1 = value.charCodeAt(1);

  // .[0-9] or if it starts with [0-9]
  if (value[0] == '.' && charCode1 >= 48 && charCode1 <= 57 || charCode0 >= 48 && charCode0 <= 57) {
    return Number(value);
  }
  return value; // string
}
