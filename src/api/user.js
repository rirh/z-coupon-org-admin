import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    baseURL: process.env.VUE_APP_BASE_USER_API,
    method: 'post',
    data: {
      action: 'login',
      ...data
    }
  })
}

export function getInfo(data) {
  return request({
    url: '/getUserInfo',
    method: 'post',
    data: {
      action: 'getUserInfo',
      uid: sessionStorage.getItem('uid')
    }
  })
}

export function logout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data: {
      action: 'logout',
      ...data
    }
  })
}
