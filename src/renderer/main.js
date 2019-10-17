import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store/store"

import VueNativeSock from "vue-native-websocket"
import VueTooltip from "vue-directive-tooltip"
import VeComponents from "./plugins/globalComponents"

import { socketHandlers } from "./socketHandlers"

import { FETCH_ROOM_DATA, SOCKET_DISCONNECT } from "./store/const/actions"

import axios from "axios"

if (!process.env.IS_WEB) Vue.use(require("vue-electron"))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueTooltip, { class: "tooltip", delay: 0 })
Vue.use(VueNativeSock, "ws://localhost/", {
  store: store,
  format: "json",
  connectManually: true,
  passToStoreHandler: function (eventName, event) {
    console.log("socket event: " + eventName)
    console.log(event.data)

    if (eventName === "SOCKET_onopen") {
      store.dispatch(FETCH_ROOM_DATA, event)
    }
    if (eventName === "SOCKET_onmessage") {
      const data = JSON.parse(event.data)
      if (!socketHandlers[data.type]) {
        console.warn("Unhandled action type: " + data.type)
      }
      socketHandlers[data.type] && socketHandlers[data.type](data, store)
    }
    if (eventName === "SOCKET_onclose") {
      store.dispatch(SOCKET_DISCONNECT)
    }
  }
})

// register global components
Vue.use(VeComponents)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
