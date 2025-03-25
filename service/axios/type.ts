/*
 * @Description: 自定义类型
 */

/**
 *  请求方法
 */
export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 *  Content-type类型
 */
export enum ContentType {
  // json
  JSON = 'application/json;charset=UTF-8',
  // json
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs序列化
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  文件上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 *  和后端约定好接口返回的数据结构
 */
export type ResponseData<T = any> = {
  code: number;
  result: T;
  message?: string;
  success: boolean;
};

/**
 *  上传文件
 */
export interface UploadFileParams {
  // 其他参数
  data?: any;
  // 文件参数接口字段名
  name?: string;
  // 文件
  files: File | Blob | any;
  // 文件名称
  filename?: string;
  [key: string]: any;
}

/**
 *  封装请求函数的参数类型
 */
export type MethodParams = {
  // 接口请求url
  url: string;
  // 请求方法
  // method: string;
  method: any;
  // 接口请求参数
  params?: object;
  // 基本配置
  config?: object;
  // 自定义配置项
  customOPtions?: object;
};

export type UseParams = Pick<MethodParams, 'url' | 'params' | 'config' | 'customOPtions'>;

/**
 *  封装上传文件函数的参数类型
 */
export type UploadFuncParams = Pick<MethodParams, 'url' | 'config' | 'customOPtions'> & {
  // 接口请求参数
  params: object;
};
