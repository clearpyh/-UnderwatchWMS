import request from '@/utils/request'

export function forgotPasswordSendCode(data) {
  return request({
    url: '/auth/forgot-password/code',
    headers: { isToken: false },
    method: 'post',
    data
  })
}

export function forgotPasswordVerify(data) {
  return request({
    url: '/auth/forgot-password/verify',
    headers: { isToken: false },
    method: 'post',
    data
  })
}

export function forgotPasswordReset(data) {
  return request({
    url: '/auth/forgot-password/reset',
    headers: { isToken: false },
    method: 'post',
    data
  })
}

