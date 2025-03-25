import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { addPending, removePending } from './axiosCancel';
import cloneDeep from 'lodash/cloneDeep';

// 默认基本配置
const baseURL = 'https://v1.jinrishici.com'; // 代理地址
const baseConfig = {
  baseURL: baseURL,
  timeout: 20000, // 请求超时时长
};

// 默认的自定义参数
const defaultCustomOptions = {
  /** 是否开启取消重复请求, 默认为 true */
  isCancelRequest: true,
  /** 是否显示loading, 默认为 false */
  isShowLoading: false,
};

/**
 * @description: 创建axios实例函数
 * @param {AxiosRequestConfig} axiosConfig [请求配置]
 * @param {object} customOptions [自定义参数]
 * @return {*} 返回实例
 */
function requestInstance(axiosConfig: AxiosRequestConfig, customOptions?: object) {
  // 合并配置
  const cloneVal = cloneDeep(baseConfig);
  const conf = Object.assign(cloneVal, axiosConfig);
  const custom_options = Object.assign(defaultCustomOptions, customOptions);
  // 创建实例函数
  const instance: AxiosInstance = axios.create({
    ...conf,
  });
  // 请求拦截器
  instance.interceptors.request.use(
    (config: any) => {
      // 取消重复请求处理
      removePending(config);
      custom_options.isCancelRequest && addPending(config);
      // 添加全局的loading...
      return config;
    },
    (error: any) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response: any) => {
      removePending(response.config);
      // 响应数据处理, response.data就是后端返回的数据，结构可和后端约定格式
      const { status, data } = response;
      
      if (status === 200) {
        // 通过登录或者注册接口以后会返回一个token和userId，存储到本地
        // if (data.token) {
        //   setToken(data.token);
        // }
        if (data.retcode == '401') {
          // history.push('/login');
          window.location.href = '/login' // 临时写
        } else if (data.retcode !== 0) {
          console.log('This is an error message');
        }
      }
      return response;
    },
    (error: any) => {
      error.config && removePending(error.config);
      // 对响应错误处理
      // 错误抛到业务代码error.data = {};
      return Promise.reject(error);
    }
  );
  return instance(axiosConfig);
}

export default requestInstance;
