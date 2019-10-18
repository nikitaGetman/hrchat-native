import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== 'production',
  state: {
    value: 0
  },
  mutations: {
    SOME_MUTATION: state => {
      state.value += 1
    }
  },
  actions: {
    SOME_ACTION: ({ state, commit }) => {
      console.log('ACGION')
      commit('SOME_MUTATION')
      console.log(state.value)
    }
  }
})
