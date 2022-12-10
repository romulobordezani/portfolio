/**
 * References:
 * https://getbem.com/naming/
 * https://codesandbox.io/s/j4jqqko9r5?file=/index.js:313-484
 * @param args
 */
export const bem = (...args: string[]) =>
  args.reduce((out, x, i) => {
    out += x;
    if (i === args.length - 1) {
      return out;
    } else if (i === 0) {
      return (out += '__');
    }

    return (out += '--');
  }, '');
