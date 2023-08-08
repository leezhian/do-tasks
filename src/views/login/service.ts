import { _post } from "@/helpers/request"

export interface UserInfo {
  avatar: string
  email: string
  name: string
  phone: string
  sex: number
  uid: string
}

export interface LoginResponse extends UserInfo {
  token: string
}

export function fetchLogin(phone: string, password: string) {
  return _post<LoginResponse>('/auth/login', {
    phone,
    password,
  })
}