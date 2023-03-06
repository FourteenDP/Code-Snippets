namespace ErrorCaptured {
  /**
   * 优雅的处理 async&await
   * @param        {Function} asyncFunc
   * @return       {Array}
   * @example     : let [err, res] = await errorCaptured(asyncFunc)
   *
   */
  async function errorCaptured(asyncFunc) {
    try {
      let res = await asyncFunc()
      return [null, res]
    } catch (e) {
      return [e, null]
    }
  }

  async function asyncFunc(): Promise<any> {
    return Promise.resolve('success')
  }

  async function main() {
    let [err, res] = await errorCaptured(asyncFunc)
    console.log(err, res)
  }
  main()
}
