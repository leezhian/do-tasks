/*
 * @Author: kim
 * @Date: 2023-10-15 22:22:07
 * @Description: 上传文件
 */
import { _post } from '@/helpers/request'
import type { FileInfo } from '@/typings/base'

/**
 * @description: 上传文件
 * @param {FormData} formData
 * @return {*}
 */
export function uploadFile(formData: FormData) {
  return _post<FileInfo>('/common/upload', formData)
}

/**
 * @description: 上传文件
 * @param {string} type 文件类型
 * @param {string} fileName 文件名
 * @param {string} content 内容
 * @return {FileInfo}
 */
export const upload = async (type: string, fileName: string, content: string) => {
  const blob = new Blob([content], { type })
  const formData = new FormData()
  formData.append('file', blob, fileName)
  const res = await uploadFile(formData)
  return res
}