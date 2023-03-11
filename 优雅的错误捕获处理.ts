namespace ErrorCaptured {
  /**
   * @description  : 错误捕获处理
   * @param        {Function} func
   * @return       {Array}
   * @example     :
   * let [err, res] = await errorCaptured(asyncFunc)
   * let [err, res] = await errorCaptured(func())
   *
   */
  async function errorCaptured<T>(func: Function): Promise<[Error | null, T | null]> {
    try {
      const isAsync = func.constructor.name === 'AsyncFunction'
      const res = isAsync ? await func() : func()
      return [null, res]
    } catch (err: any) {
      return [err, null]
    }
  }

  async function asyncFunc(): Promise<any> {
    if (Math.random() > 0.5) {
      throw new Error('error')
    }
    return Promise.resolve('success')
  }

  function func(): any {
    if (Math.random() > 0.5) {
      throw new Error('error')
    }
    return 'success'
  }

  async function main() {
    let [err, res] = await errorCaptured(asyncFunc)
    console.log(err, res)
    let [err2, res2] = await errorCaptured(func)
    console.log(err2, res2)
  }
  main()
}
