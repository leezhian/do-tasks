/*
 * @Author: kim
 * @Date: 2023-08-08 13:54:54
 * @Description: 
 */
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { redirect } from 'react-router-dom'
import { useUserStore } from '@/store/useUserStore'
import Toast from '@/components/shared/toast'

export enum NETWORK_CODE {
  SUCCESS = 200
}

const http = axios.create()

function createRequest(method = 'GET') {
  return <T>(url: string, data?: Object, config?: AxiosRequestConfig<any>) => {
    return request<T>(url, data, {
      method: method.toUpperCase(),
      ...config
    })
  }
}

/**
 * @description: 请求
 * @param {RequestInfo | URL} url 请求地址或 request 对象
 * @param {Object} data 请求参数（仅支持简单的请求方法，比如url 为 URL类型时 或 post请求传 json参数）
 * @param {RequestInit} config 请求配置对象（想要更多自定义请求建议使用这个而不是使用data）
 * @return {Promise<Request.Response<T>>} T 是接口返回数据中 data 的类型
 */
async function request<T = unknown>(url: string, data?: Object, config?: AxiosRequestConfig<any>): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const authToken = useUserStore.getState().token
      const fetchConfig = {
        url,
        ...config,
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : '',
          ...config?.headers,
        }
      }
    
      if (fetchConfig.method?.toUpperCase() === 'GET') {
        fetchConfig.params = {
          ...data,
          ...fetchConfig.params
        }
      } else {
        fetchConfig.data = {
          ...data,
          ...fetchConfig.data
        }
      }
      
      const response = await http(fetchConfig)
      
      resolve(response.data)
    } catch (error: any) {
      const rejData = error.response?.data
      if(error.response?.status === 401) {
        useUserStore.getState().setToken('')
        Toast.error(rejData?.message)
        redirect('/login')
      }
      reject(rejData)
    }
  })
}

export const _post = createRequest('POST')
export const _get = createRequest('GET')
export const _delete = createRequest('DELETE')
export const _put = createRequest('PUT')
export const _patch = createRequest('PATCH')

export default request