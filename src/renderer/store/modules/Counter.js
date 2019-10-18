const state = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER(state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER(state) {
    console.log('INCREMENTED')
    state.main++
  }
}

const actions = {
  someAsyncTask({ commit }) {
    console.log('INCREMENTED')
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
    alert('aa')
  }
}

export default {
  state,
  mutations,
  actions
}
