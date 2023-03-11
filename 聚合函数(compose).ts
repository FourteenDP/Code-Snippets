namespace CodeSnippets {
  export function compose(...fns: Function[]) {
    return function (arg: any) {
      // 遍历函数数组，从右向左执行函数
      return fns.reduceRight((result, fn) => fn(result), arg);
    };
  }
}
