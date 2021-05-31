import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken() || '',
    name: '',
    avatar: '',
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  update_userinfo: (state, userinfo) => {
    state.userInfo = userinfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          if (response?.userInfo?.role) {
            if (!response?.userInfo?.role.includes('ADMIN')) {
              reject({ message: '没有权限访问' })
            }
          }
          commit('SET_TOKEN', response.token)
          setToken(response.token)
          sessionStorage.setItem('uid', response.userInfo?._id)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          if (!response) {
            return reject('Verification failed, please Login again.')
          }
          sessionStorage.setItem('uid', response.userInfo?._id)
          commit('SET_NAME', response.userInfo?.username)
          commit('update_userinfo', response.userInfo)
          commit(
            'SET_AVATAR',
            response.avatar ||
              response.avatarUrl ||
              'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-ngaburcbpntf97199d/cabb4af0-352b-11eb-899d-733ae62bed2f.png'
          )
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({ token: getToken() })
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
