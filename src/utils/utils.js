/**
 * 将浮点型金额格式化成大写中文
 * @param {Number} num  xx.xx
 * @returns 玐玖拾贰叁.角分
 */
export function currency (num) {
  let n = num * 1
  if (!n) return 0
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  const head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  )
}

// 哈萨克语单位
export function currencyKz (num) {
  let n = num * 1
  if (!n) return 0
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  const head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  )
}

// 格式化数字，每隔三位加 , 如: -123,45.1234
export function formaterPrice (n, type = '') {
  let symbol = ''
  if (!['', null, undefined].includes(n)) {
    let a = n.toString()
    if (a.substr(0, 1) === '-') {
      // 增加对负数的处理
      a = a.substring(1)
      symbol = '-'
    }
    const integer = a.split('.')[0]
    const decemal = a.split('.')[1]
    const returnStr = `${type}${symbol}${integer
      .toString()
      .replace(/(?=(?!^)(\d{3})+$)/g, ',')}${decemal * 1 ? '.' + decemal : ''}`
    return returnStr
  }
}

// 金额输入格式
export function formatterAmount (value) {
  let sum = value + ''

  // 判断第一位就是小数点处理
  if (sum.indexOf('.') === 0) {
    sum = '0' + sum
  }

  sum = sum.replaceAll(',', '')

  const pattern = `^([1-9]\\d{${11}})\\d*`
  const reg = new RegExp(pattern, 'g')
  sum = sum.replace(reg, '$1')
  // 清除数字和小数点以外的字符
  sum = sum.replace(/[^\d.]/g, '')
  // 只保留第一个小数点，其余清除
  sum = sum.replace(/\.{2,}/g, '.')
  sum = sum
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(/^0+\./, '0.')
    .replace(/^0+([0-9])/, '$1')
  // 只能输入两位小数
  sum = sum.replace(/^(\d-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
  // 控制如果没有小数点，防止出现类似01现象
  if (sum.indexOf('.') < 0 && sum !== '') {
    sum = parseFloat(sum)
  }
  const retSum = sum + ''
  // 千位符
  const regSum = retSum.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
  return retSum.replace(regSum, '$1,')
}

// 格式化纯数字
export function formatterNumber (value) {
  return value.replace(/[\D]/g, '')
}

// 格式化英文数字
export function formatterNumAndEn (value) {
  return value.replace(/[^a-zA-Z0-9]/g, '')
}

// 格式化姓名（中文·）
export function formatterChineseName (value) {
  const regExp = /[^\u4e00-\u9fa5|^·]/ig
  const result = value.replace(regExp, '')
  return result
}
