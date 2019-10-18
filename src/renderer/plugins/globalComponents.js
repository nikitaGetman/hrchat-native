import VeButton from '../components/VeButton'
import VeInput from '../components/VeFormInput'
import VeAlert from '../components/VeAlert'

export default {
  install(Vue) {
    Vue.component(VeButton.name, VeButton)
    Vue.component(VeInput.name, VeInput)
    Vue.component(VeAlert.name, VeAlert)
  }
}
