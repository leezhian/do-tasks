/*
 * @Author: kim
 * @Date: 2023-08-08 16:41:04
 * @Description: 
 */
export type ValidationFn = (value: any) => void

export function isString(msg: string = '参数必须是字符串') {
  return (value: any) => {
    if (typeof value !== 'string') {
      throw new Error(msg)
    }
  }
}

export function isNumber(msg: string = '参数必须是数字') {
  return (value: any) => {
    if (typeof value !== 'number') {
      throw new Error(msg)
    }
  }
}

export function isNotEmpty(msg: string = '参数不能为空') {
  return (value: any) => {
    if (value === undefined || value === null || value.trim() === '') {
      throw new Error(msg)
    }
  }
}

export function minLength(min: number, msg: string = `参数长度必须大于等于${min}`) {
  return (value: any) => {
    if (value.length < min) {
      throw new Error(msg)
    }
  }
}

export function maxLength(max: number, msg: string = `参数长度必须小于等于${max}`) {
  return (value: any) => {
    if (value.length > max) {
      throw new Error(msg)
    }
  }
}

export function isPhone(msg: string = '手机号格式不正确') {
  return (value: any) => {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      throw new Error(msg)
    }
  }
}

/**
 * @description: 验证
 * @param {any} value 需要验证的值
 * @param {Array} rules 验证规则
 * @return {string | undefined} 验证失败返回错误信息，验证成功返回 undefined
 */
export function validate(value: any, rules: Array<ValidationFn>) {
  try {
    for (const rule of rules) {
      rule(value)
    }
  } catch (error: any) {
    return error.message
  }
}