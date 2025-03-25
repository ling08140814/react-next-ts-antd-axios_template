/*
 * @Description: 取消重复请求功能函数
 */
import axios, { Canceler, AxiosRequestConfig } from 'axios';
import { isFunction } from 'lodash';

// 定义一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, Canceler>();

/**
 * @description: 生成每个请求唯一的键
 * @param {*} config
 * @return string
 */
const getPendingKey = (config: AxiosRequestConfig) =>
  [config.method, config.url, JSON.stringify(config.data), JSON.stringify(config.params)].join('&');

/**
 * @description: 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
export function addPending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingMap.has(pendingKey)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pendingMap.set(pendingKey, cancel);
      }
    });
}

export function removePending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pendingMap.get(pendingKey);
    cancel && cancel(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * @description: 清空所有pending
 */
export function removeAllPending() {
  pendingMap.forEach(cancel => {
    cancel && isFunction(cancel) && cancel();
  });
  pendingMap.clear();
}

/**
 * @description: 重置
 */
export function reset(): void {
  pendingMap = new Map<string, Canceler>();
}
