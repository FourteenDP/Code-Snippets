namespace CodeSnippets {
  export function compose(...fns: Function[]) {
    if (fns.length === 0) {
      return (arg: any) => arg;
    }
    return function (arg: any) {
      return fns.reduceRight((result, fn) => fn(result), arg);
    };
  }
}
