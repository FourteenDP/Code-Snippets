namespace CodeSnippets {
  export function compose(...fns: Function[]) {
    return function (arg: any) {
      return fns.reduceRight((result, fn) => fn(result), arg);
    };
  }
}
