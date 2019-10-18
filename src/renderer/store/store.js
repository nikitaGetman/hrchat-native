import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import apiClient from '../services/service'
import websocketClient from '../services/websocket'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import {
  LOGIN,
  RESTORE_SESSION,
  LOGOUT,
  GET_ROOM_CREATION_PARAMS,
  CREATE_ROOM,
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  FETCH_ROOM_DATA,
  START_TRAINING,
  STOP_TRAINING,
  START_ROUND,
  SEND_MESSAGE,
  DENY_READINESS,
  CONFIRM_READINESS,
  KICK_STUDENT,
  MARK_ANSWER
} from './const/actions'
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  SET_USER,
  RESET_STORE,
  SET_ROOM_CREATION_PARAMS,
  SET_ROOM,
  ADD_MESSAGE,
  SET_USERLIST,
  SET_EVENT,
  SET_READINESS,
  SET_TRAINING_STARTED,
  SET_ROUND_STARTED,
  SET_ROUND_FINISHED,
  REMOVE_STUDENT,
  RESET_ROOM_DATA
} from './const/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: localStorage.getItem('user-token') || null,
    user: {
      username: null,
      is_trainer: null,
      room_id: null,
      is_readiness_confirmed: false
    },
    auth_status: '',
    room_creation_params: {
      student_maximum: 15,
      student_minimum: 1,
      timer_maximum: 120,
      timer_minimum: 10,
      round_maximum: 15,
      round_minimum: 1
    },
    room: {
      id: null,
      is_active: null,
      timer: null,
      count_students: null,
      is_championship: null,
      round_number: null,
      total_rounds: null
    },
    messages: [],
    userlist: [],
    chat_event: '',
    is_input_enabled: false,
    is_admin_writing: false
  },
  mutations: {
    [AUTH_REQUEST]: state => {
      state.auth_status = 'loading'
    },
    [AUTH_ERROR]: state => {
      state.auth_status = 'error'
    },
    [SET_USER]: (state, user) => {
      state.token = user.access
      state.user.username = user.username
      state.user.is_trainer = user.is_trainer
      state.user.room_id = user.room_id
      state.auth_status = 'success'
    },
    [RESET_STORE]: state => {
      state.token = null
      state.user.username = null
      state.user.is_trainer = null
      state.user.is_readiness_confirmed = false
      state.auth_status = ''

      state.messages = []
    },
    [SET_ROOM_CREATION_PARAMS]: (state, params) => {
      state.room_creation_params = { ...params }
    },
    [SET_ROOM]: (state, params) => {
      state.room = { ...params }
      state.user.room_id = params.id
    },
    [ADD_MESSAGE]: (state, data) => {
      const message = {
        id: data.id,
        from: data.username,
        text: data.text,
        time: data.created_at,
        fromAdmin: data.is_trainer,
        checked: false,
        locked: !(
          data.is_trainer ||
          state.user.is_trainer ||
          data.username === state.user.username
        )
      }
      state.messages.push(message)

      if (data.username === state.user.username) {
        state.is_input_enabled = false
      }
    },
    [SET_USERLIST]: (state, list) => {
      state.userlist = list
    },
    [SET_EVENT]: (state, event) => {
      state.chat_event = event
    },
    [SET_READINESS]: (state, value) => {
      state.user.is_readiness_confirmed = value
    },
    [SET_TRAINING_STARTED]: state => {
      state.room.is_active = true
    },
    [SET_ROUND_STARTED]: state => {
      state.is_input_enabled = true
    },
    [SET_ROUND_FINISHED]: state => {
      state.is_input_enabled = false
      state.messages.forEach(msg => {
        msg.locked = false
      })
    },
    [REMOVE_STUDENT]: (state, name) => {
      state.userlist.splice(state.userlist.indexOf(name), 1)
    },
    [RESET_ROOM_DATA]: state => {
      state.room.id = null
      state.room.is_active = null
      state.room.timer = null
      state.room.count_students = null
      state.room.is_championship = null
      state.room.round_number = null
      state.room.total_rounds = null

      state.messages = []
      state.userlist = []
      state.chat_event = ''
      state.is_input_enabled = false
    }
  },
  actions: {
    [LOGIN]: ({ commit }, userCredentials) => {
      console.log('DISPATCHED LOGIN')
      commit(AUTH_REQUEST)

      return apiClient
        .login(userCredentials)
        .then(res => {
          localStorage.setItem('user-token', res.access)
          commit(SET_USER, res)
          return res
        })
        .catch(err => {
          commit(AUTH_ERROR)
          throw err
        })
    },
    [RESTORE_SESSION]: ({ state, commit }) => {
      commit(AUTH_REQUEST)

      return apiClient
        .restoreSession()
        .then(res => {
          commit(SET_USER, { access: state.token, ...res })
          return res
        })
        .catch(err => {
          commit(AUTH_ERROR)
          throw err
        })
    },
    [LOGOUT]: ({ commit }) => {
      commit(RESET_STORE)
      commit(RESET_ROOM_DATA)
      websocketClient.disconnect()
      localStorage.removeItem('user-token')
      router.push({ name: 'accountType' })
    },
    [GET_ROOM_CREATION_PARAMS]: ({ commit }) => {
      return apiClient.getRoomCreationParams().then(res => {
        commit(SET_ROOM_CREATION_PARAMS, res)
        return res
      })
    },
    [CREATE_ROOM]: ({ commit }, params) => {
      // TODO: remove on backend fix
      params.is_championship = !params.is_championship
      return apiClient.createRoom(params).then(res => {
        commit(SET_ROOM, res)
        return res
      })
    },
    [SOCKET_CONNECT]: ({ state }) => {
      websocketClient.connect(state.user.room_id, state.token)
    },
    [SOCKET_DISCONNECT]: () => {
      websocketClient.connection = null
    },
    [FETCH_ROOM_DATA]: (_, event) => {
      websocketClient.connection = event.currentTarget
      websocketClient.sendMessage('fetch_data')
    },
    [START_TRAINING]: () => {
      websocketClient.sendMessage('start_game')
    },
    [STOP_TRAINING]: () => {
      websocketClient.sendMessage('end_game_session_force')
    },
    [START_ROUND]: (_, msg) => {
      websocketClient.sendMessage('start_round', msg)
    },
    [SEND_MESSAGE]: ({ state }, msg) => {
      if (state.user.is_trainer) {
        websocketClient.sendMessage('chat_msg_trainer', msg)
      } else {
        websocketClient.sendMessage('chat_msg_student', msg)
      }
    },
    [DENY_READINESS]: ({ commit }) => {
      commit(SET_EVENT, '')
      websocketClient.sendMessage('student_decline')
    },
    [CONFIRM_READINESS]: ({ commit }) => {
      commit(SET_EVENT, '')
      websocketClient.sendMessage('student_accept')
    },
    [KICK_STUDENT]: (_, name) => {
      websocketClient.sendObj({ type: 'kick_by_username', username: name })
    },
    [MARK_ANSWER]: (_, name) => {
      websocketClient.sendObj({ type: 'mark_answer', username: name })
    }
  },
  getters: {
    hasToken: state => !!state.token,
    isAuthenticated: state => state.token && state.auth_status === 'success',
    isTrainer: state => state.user.is_trainer,
    isRoomCreated: state => !!state.user.room_id
  }
})
