export type User = {
  avatar: null | string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type LoginResponse = {
  accessToken: string
  refreshToken: string
}
export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}
export type UserResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type RecoverPassword = {
  email: string
  html: string
}
export type UpdateProfileArgs = FormData
export type SignUpArgs = Omit<LoginArgs, 'rememberMe'>
