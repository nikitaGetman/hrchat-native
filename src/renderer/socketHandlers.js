import {
  ADD_MESSAGE,
  SET_USERLIST,
  SET_EVENT,
  SET_TRAINING_STARTED,
  SET_READINESS,
  REMOVE_STUDENT,
  SET_ROUND_STARTED,
  SET_ROUND_FINISHED
} from './store/const/mutations'
import { LOGOUT } from './store/const/actions'

export const socketHandlers = {
  fetch_messages: (data, store) => {
    const messages = data.messages
    messages.forEach(msg => {
      store.commit(ADD_MESSAGE, msg)
    })
  },
  chat_list: (data, store) => {
    store.commit(SET_USERLIST, data.usernames)
  },
  start_game: (data, store) => {
    store.commit(SET_EVENT, 'check_readiness')
  },
  check_readiness_students: (data, store) => {
    store.commit(SET_TRAINING_STARTED)
    if (
      !store.state.user.is_trainer &&
      !store.state.user.is_readiness_confirmed
    ) {
      store.dispatch(LOGOUT)
    }
  },
  student_accept: (data, store) => {
    store.commit(SET_READINESS, data.status)
  },
  kicked: (data, store) => {
    if (store.state.room.is_active) {
      store.commit(SET_EVENT, 'kicked_by_trainer')
    }
  },
  kick_student: (data, store) => {
    store.commit(REMOVE_STUDENT, data.username)
  },
  start_round: (data, store) => {
    store.commit(SET_ROUND_STARTED)
    store.commit(ADD_MESSAGE, data.message)
  },
  chat_msg_trainer: (data, store) => {
    store.commit(ADD_MESSAGE, data.message)
  },
  chat_msg_student: (data, store) => {
    store.commit(ADD_MESSAGE, data.message)
  },
  early_end_round: (data, store) => {
    store.commit(SET_ROUND_FINISHED)
  },
  end_round: (data, store) => {
    store.commit(SET_ROUND_FINISHED)
  },
  end_game_session: (data, store) => {
    const results = {
      text: data.message,
      is_trainer: true,
      username: '',
      created_at: ''
    }
    store.commit(SET_ROUND_FINISHED)
    store.commit(ADD_MESSAGE, results)
    store.commit(SET_EVENT, 'training_finished')
  }
}
