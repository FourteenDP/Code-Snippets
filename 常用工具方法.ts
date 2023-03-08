/**
 * 字符串超出转换为省略号
 * @param str 字符串
 * @param len 长度
 * @returns {string}
 *
 */
export function ellipsis(str: string, len: number): string {
  if (str.length > len) {
    return str.substring(0, len) + '...';
  }
  return str;
}

/**
 * 生成随机字符串 - 支持 数字 大小写字母 特殊字符
 * @param len 长度
 * @param type[] 类型 ['number', 'lower', 'upper', 'symbol']
 * @returns {string}
 *
 */
export function randomString(len: number, type: string[] = ['number', 'lower', 'upper', 'symbol']): string {
  const chars = {
    number: '0123456789',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    symbol: '~!@#$%^&*()_+-={}[]:";\'<>?,./|\\',
  };
  const charType = type.map((item) => chars[item]).join('');

  let result = '';
  for (let i = len; i > 0; --i) {
    result += charType[Math.floor(Math.random() * charType.length)];
  }

  return result;
}

/**
 * 判断对象类型
 * @param obj 对象
 * @returns {string}
 */
export function type(obj: any): string {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * 判断是否为数组
 * @param obj 对象
 * @returns {boolean}
 */
export function isArray(obj: any): boolean {
  return type(obj) === 'array';
}

/**
 * 判断是否为对象
 * @param obj 对象
 * @returns {boolean}
 */
export function isObject(obj: any): boolean {
  return type(obj) === 'object';
}

/**
 * 判断是否为函数
 * @param obj 对象
 * @returns {boolean}
 */
export function isFunction(obj: any): boolean {
  return type(obj) === 'function';
}

/**
 * 判断是否为字符串
 * @param obj 对象
 * @returns {boolean}
 */
export function isString(obj: any): boolean {
  return type(obj) === 'string';
}

/**
 * 判断是否为数字
 * @param obj 对象
 * @returns {boolean}
 */
export function isNumber(obj: any): boolean {
  return type(obj) === 'number';
}

/**
 * 判断是否为布尔值
 * @param obj 对象
 * @returns {boolean}
 */
export function isBoolean(obj: any): boolean {
  return type(obj) === 'boolean';
}

/**
 * 判断是否是空对象
 * @param obj 对象
 * @returns {boolean}
 */
export function isEmptyObject(obj: any): boolean {
  return JSON.stringify(obj) === '{}';
}

/**
 * 判断是否是空数组
 * @param obj 对象
 * @returns {boolean}
 */
export function isEmptyArray(obj: any): boolean {
  return JSON.stringify(obj) === '[]';
}

/**
 * 判断是否是空值
 * @param obj 对象
 * @returns {boolean}
 */
export function isEmpty(obj: any): boolean {
  return obj === undefined || obj === null || obj === '';
}

/**
 * 常用正则表达式
 * @type {{email: RegExp; mobile: RegExp; url: RegExp; tel: RegExp; number: RegExp; english: RegExp; chinese: RegExp; lower: RegExp; upper: RegExp; html: RegExp}}
 */
export const regExp = {
  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
  mobile: /^1[3|4|5|7|8][0-9]{9}$/,
  url: /[a-zA-z]+:\/\/[^\s]*/,
  tel: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
  number: /^[0-9]*$/,
  english: /^[a-zA-Z]+$/,
  chinese: /^[\u4E00-\u9FA5]+$/,
  lower: /^[a-z]+$/,
  upper: /^[A-Z]+$/,
  html: /<("[^"]*"|'[^']*'|[^'">])*>/,
};

/**
 * 判断是否符合规则可自定义
 * @param str 字符串
 * @param type 类型
 * @returns {boolean}
  */
type RegExpType = keyof typeof regExp;
export function isRegExp(str: string, par): boolean {
  return regExp[type].test(str);
}
