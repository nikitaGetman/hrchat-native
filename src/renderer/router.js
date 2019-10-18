import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

import AccountTypeSelection from './views/AccountTypeSelection.vue'
import StudentLogin from './views/StudentLogin.vue'
import CoachLogin from './views/CoachLogin.vue'

import Header from './components/Header.vue'
import CreateRoom from './views/CreateRoom.vue'
import Chat from './views/Chat.vue'
import ChatEnd from './views/ChatEnd.vue'

import { RESTORE_SESSION } from './store/const/actions'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'accountType',
      component: AccountTypeSelection,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/student-login',
      name: 'studentLogin',
      component: StudentLogin,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/coach-login',
      name: 'coachLogin',
      component: CoachLogin,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/create-room',
      name: 'createRoom',
      components: { default: CreateRoom, header: Header },
      meta: {
        requiresAuth: true,
        trainerOnly: true
      }
    },
    {
      path: '/training-finished',
      name: 'trainingFinished',
      components: { default: ChatEnd, header: Header },
      meta: {
        requiresAuth: true,
        trainerOnly: true
      }
    },
    {
      path: '/chat',
      name: 'chat',
      components: { default: Chat, header: Header },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: { name: 'chat' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const roomId = to.query.roomId || from.query.roomId

  if (store.getters.isAuthenticated) {
    next()
  } else if (store.getters.hasToken) {
    store.dispatch(RESTORE_SESSION).then(user => {
      if (user.room_id) next({ name: 'chat', query: { roomId: user.room_id } })
      else if (user.is_trainer) next({ name: 'createRoom' })
      else {
        console.warn('Unresolved path: ' + to.fullPath)
        console.warn(user)
      }
    })
  } else if (!to.meta.requiresAuth) {
    next()
  } else {
    next({ name: 'accountType', query: { roomId } })
  }
})

export default router
