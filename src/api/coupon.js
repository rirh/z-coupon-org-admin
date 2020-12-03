import request from '@/utils/request'

const url = '/coupon'

export function getCoupon(data) {
  return request({
    url,
    method: 'post',
    data: {
      action: 'login',
      ...data
    }
  })
}

export function getInfo(data) {
  return request({
    url,
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
    method: 'post',
    data
  })
}
