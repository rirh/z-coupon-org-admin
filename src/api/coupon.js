import request from '@/utils/request'

const url = '/coupon'

export function getCoupon(data) {
  return request({
    url,
    method: 'post',
    data: {
      action: 'query',
      ...data
    }
  })
}

export function addCoupon(data) {
  return request({
    url,
    method: 'post',
    data: {
      action: 'add',
      ...data
    }
  })
}
export function updateCoupon(data) {
  return request({
    url,
    method: 'post',
    data: {
      action: 'update',
      ...data
    }
  })
}
export function removeCoupon(data) {
  return request({
    url,
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
