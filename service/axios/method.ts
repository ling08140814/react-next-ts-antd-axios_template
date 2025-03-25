/*
 * @Description: 请求方法封装
 */
import requestInstance from './index';
import { RequestMethod, ContentType, MethodParams } from './type';
import { AxiosRequestConfig } from 'axios';

/**
 * @description: 公用请求函数
 * @param {string} url [接口请求url]
 * @param {string} method [请求方法]
 * @param {object} params [接口请求参数]
 * @param {object} config [基本配置]
 * @param {object} customOPtions [自定义配置项]
 * @return {*}
 */
const request = (requestParams: MethodParams) => {
  const { url, method, params, config, customOPtions } = requestParams;
  const configObj: AxiosRequestConfig = {
    url,
    method,
    ...config,
  };
  if (method.toLowerCase() === 'get') {
    configObj.params = params;
  } else {
    configObj.data = params;
  }
  return requestInstance(configObj, customOPtions);
};

/**
 * @description: 请求方法公用函数和异常处理
 * @param {RequestMethod} method [请求方法]
 * @return {*}
 */
function requestMethod(method: RequestMethod) {
  return async function (url: string, params?: object, config?: object, customOPtions?: object) {
    const dataParams: MethodParams = {
      url,
      method,
      config,
      customOPtions,
      params: params || {},
    };
    // 统一处理返回类型
    try {
      const response = await request(dataParams);
      const { data } = response;
      return { err: null, data, response };
    } catch (err: any) {
      return { err, data: null, response: null };
    }
  };
}

/**
 * get方法，对应get请求
 */
export const GET = requestMethod(RequestMethod.GET);

/**
 * post方法，对应post请求
 */
export const POST = requestMethod(RequestMethod.POST);

/**
 * PUT方法，对应PUT请求
 */
export const PUT = requestMethod(RequestMethod.PUT);

/**
 * @description: 文件上传请求方法
 * @param {string} url [接口请求url]
 * @param {object} params [接口请求参数]
 * @param {object} config [基本配置]
 * @param {object} customOPtions [自定义配置项]
 * @return {*}
 */
export function uploadFile(url: string, params: FormData, config?: object, customOPtions?: object) {
  const configObj: AxiosRequestConfig = {
    url: url,
    method: RequestMethod.POST,
    data: params,
    headers: {
      'Context-Type': ContentType.FORM_DATA,
    },
    ...config,
  };
  return requestInstance(configObj, customOPtions);
}
