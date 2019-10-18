import Vue from 'vue'
import { HOST } from '../config'

export default {
  connection: null,
  connect(roomId, token) {
    const url = `ws://${HOST}/ws/chat/${roomId}/?token=${token}`

    Vue.prototype.$connect(url)
  },
  sendMessage(type, message) {
    this.connection.sendObj({ type, message })
  },
  sendObj(obj) {
    this.connection.sendObj(obj)
  },
  disconnect() {
    if (this.connection) {
      Vue.prototype.$disconnect()
      this.connection = null
    }
  }
}
