/*
 * @Description: 状态码处理和处理异常
 */
export function checkStatus(status: number, msg: string) {
  let message = '';
  switch (status) {
    case 401:
      message = '您未登录，或者登录已经超时，请先登录！';
      break;
    default:
      message = msg;
  }
  return message;
}

/**
 * @description: 返回值异常处理函数:包装一个promise请求，写上catch，返回一个结果确定的promise
 * @param {Promise} p
 * @return {*}
 */
export function errorCatch<T = any>(p: Promise<any>): [T, any] {
  return p.then(res => [res, undefined]).catch(err => [undefined, err]) as unknown as [T, any];
}
