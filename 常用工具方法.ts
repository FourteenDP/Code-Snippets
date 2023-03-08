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
  let result = '';

  for (let i = 0; i < len; i++) {
    const typeIndex = Math.floor(Math.random() * type.length);
    const charIndex = Math.floor(Math.random() * chars[type[typeIndex]].length);
    result += chars[type[typeIndex]][charIndex];
  }

  return result;
}
