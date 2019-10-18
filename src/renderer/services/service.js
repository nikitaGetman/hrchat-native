import axios from 'axios'
import store from '../store/store'
import { LOGOUT } from '../store/const/actions'
import { HOST } from '../config'

const apiClient = axios.create({
  baseURL: `http://${HOST}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

apiClient.interceptors.response.use(
  r => r.data,
  error => {
    const url = error.request.responseURL
    if (
      url &&
      !url.includes('/api/student/') &&
      !url.includes('/auth/token/trainer/') &&
      error.response.status === 401
    ) {
      store.dispatch(LOGOUT)
    }
    return Promise.reject(error)
  }
)

apiClient.interceptors.request.use(
  config => {
    const token = store.state.token
    if (!token) {
      return config
    }
    const newConfig = {
      ...config,
      headers: { ...config.headers, Authorization: `JWT ${token}` }
    }
    return newConfig
  },
  e => Promise.reject(e)
)

export default {
  login(credentials) {
    const isTrainer = credentials.isTrainer

    if (isTrainer) {
      const data = {
        username: credentials.username,
        password: credentials.password
      }
      return apiClient.post('/auth/token/trainer/', data)
    } else {
      const data = {
        nickname: credentials.nickname,
        password: credentials.roomId
      }
      return apiClient.post('/api/student/', data)
    }
  },

  restoreSession() {
    return apiClient.get('/api/user/')
  },

  getRoomCreationParams() {
    return apiClient.get('/api/room/info/')
  },

  createRoom(params) {
    return apiClient.post('/api/room/', params)
  }
}
