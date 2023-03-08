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
 * @param type[] 类型 number
 * @returns {string}
 *
 */
export function randomString(len: number, type: string[] = ['number', 'lower', 'upper']): string {
  const types = {
    number: '0123456789',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  };
  let str = '';
  for (let i = 0; i < len; i++) {
    const t = type[Math.floor(Math.random() * type.length)];
    str += types[t].charAt(Math.floor(Math.random() * types[t].length));
  }
  return str;
}
