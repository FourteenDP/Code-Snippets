namespace CodeSnippets {
  // 聚合函数-函数接收任意多个函数作为参数，返回一个新函数，新函数的参数是一个初始值，新函数的返回值是所有函数执行结果的聚合。

  export function compose(...fns: Function[]) {
    return function (arg: any) {
      // 遍历函数数组，从右向左执行函数
      return fns.reduceRight((result, fn) => fn(result), arg);
    };
  }
}

CodeSnippets.compose()(2)
