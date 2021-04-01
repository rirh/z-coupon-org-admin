import request from '@/utils/request'

const url = '/login-auth-wechat'

export function getOpenidList(data) {
  return request({
    url,
    baseURL: process.env.VUE_APP_BASE_COUPON_API,

    method: 'post',
    data: {
      action: 'query',
      ...data
    }
  })
}
export function removeCoupon(data) {
  return request({
    url,
    baseURL: process.env.VUE_APP_BASE_COUPON_API,

    method: 'post',
    data: {
      action: 'remove',
      ...data
    }
  })
}

export function getInfo(data) {
  return request({
    url,
    baseURL: process.env.VUE_APP_BASE_COUPON_API,

    method: 'post',
    data: {
      action: 'getUserInfo',
      uid: sessionStorage.getItem('uid')
    }
  })
}

export function logout(data) {
  return request({
    url,
    baseURL: process.env.VUE_APP_BASE_COUPON_API,

    method: 'post',
    data
  })
}
