
// 实现call方法
Function.prototype.myCall = function (context, ...args) {
  // 判断是否为函数调用
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  // 判断context是否为null或undefined (null和undefined都会被转换成globalThis)
  context = context || globalThis
  // 将调用call的函数设为context的一个属性
  context.fn = this
  // 调用该函数
  const result = context.fn(...args)
  // 删除该属性
  delete context.fn
  // 返回结果
  return result
}

// 测试
const obj = {
  name: 'obj',
  getName() {
    console.log(this.name)
  }
}

const obj2 = {
  name: 'obj2'
}

obj.getName.myCall(obj2) // obj2



// 实现apply方法
Function.prototype.myApply = function (context, args) {
  // 判断是否为函数调用
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  // 判断context是否为null或undefined (null和undefined都会被转换成globalThis)
  context = context || globalThis
  // 将调用call的函数设为context的一个属性
  context.fn = this
  // 调用该函数
  const result = context.fn(...args)
  // 删除该属性
  delete context.fn
  // 返回结果
  return result
}

// 测试
const obj3 = {
  name: 'obj3',
  getName() {
    console.log(this.name)
  }
}

const obj4 = {
  name: 'obj4'
}

obj3.getName.myApply(obj4, []) // obj4

// 实现bind方法
Function.prototype.myBind = function (context, ...args) {
  // 判断是否为函数调用
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  // 保存this
  const self = this
  // 返回一个函数
  return function F(...args2) {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new self(...args, ...args2)
    }
    return self.apply(context, args.concat(args2))
  }
}

// 测试
const obj5 = {
  name: 'obj5',
  getName() {
    console.log(this.name)
  }
}

const obj6 = {
  name: 'obj6'
}

obj5.getName.myBind(obj6)() // obj6
