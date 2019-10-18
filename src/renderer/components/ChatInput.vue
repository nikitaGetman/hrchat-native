<template>
  <div class="input-wrapper" :class="{ disabled }">
    <input
      class="chat-input"
      type="text"
      :placeholder="disabled ? '' : 'Введите сообщение...'"
      v-model="message"
      :disabled="disabled"
      @keypress.enter="sendMessage"
    />

    <div class="timer" v-if="!$store.state.user.is_trainer">{{ timer }}</div>

    <template v-else>
      <div class="btn-group" :class="{ visible: showControl }">
        <!-- stop button -->
        <div class="btn-container" v-tooltip.top="'Завершить тренинг'">
          <ve-button tile color="orange" @click="stopTraining">
            <icon-cross />
          </ve-button>
        </div>
        <!-- start training button -->
        <div class="btn-container" v-tooltip.top="'Начать тренинг'">
          <ve-button tile @click="startTraining" :disabled="$store.state.room.is_active">
            <icon-start-training />
          </ve-button>
        </div>
        <!-- copy room id button -->
        <div class="btn-container" v-tooltip.top="'Скопировать код комнаты'">
          <ve-button tile @click="copyRoomId">
            <icon-copy />
          </ve-button>
        </div>
      </div>

      <button class="switch" @click="showControl = !showControl" :class="{ hide: showControl }"></button>
    </template>

    <!-- send button -->
    <div class="btn-container">
      <ve-button tile :disabled="disabled" @click="sendMessage">
        <icon-send />
      </ve-button>
    </div>
  </div>
</template>

<script>
import IconCopy from './icons/IconCopy'
import IconCross from './icons/IconCross'
import IconSend from './icons/IconSend'
import IconStartTraining from './icons/IconStartTraining'

import {
  START_TRAINING,
  STOP_TRAINING,
  START_ROUND,
  SEND_MESSAGE
} from '../store/const/actions'

export default {
  name: 'chat-input',
  components: {
    IconCopy,
    IconCross,
    IconSend,
    IconStartTraining
  },
  data: () => {
    return {
      showControl: false,
      timer: '',
      message: ''
    }
  },
  computed: {
    disabled() {
      return (
        !this.$store.state.user.is_trainer &&
        !this.$store.state.is_input_enabled
      )
    }
  },
  methods: {
    stopTraining() {
      this.$store.dispatch(STOP_TRAINING)
    },
    startTraining() {
      this.$store.dispatch(START_TRAINING)
    },
    copyRoomId() {
      navigator.clipboard
        .writeText(this.$store.state.user.room_id)
        .then(() => {
          console.log('copied')
        })
        .catch(err => {
          console.warn('Can not copy room id!')
          console.warn(err)
        })
    },
    sendMessage() {
      if (
        this.$store.state.user.is_trainer &&
        this.$store.state.room.is_active
      ) {
        this.$store.dispatch(START_ROUND, this.message)
      } else {
        this.$store.dispatch(SEND_MESSAGE, this.message)
      }
      this.message = ''
    }
  }
}
</script>

<style lang="scss">
.input-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  border: 1px solid #999999;

  &.disabled {
    border: 1px solid #cccccc;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -5;

    background-color: #fff;
  }
}
.chat-input {
  display: block;
  height: 100%;
  flex: 1 1 1px;
  padding: 21px 10px;
  box-sizing: border-box;
  border: none;

  font-size: 14px;
  line-height: 16px;

  color: #333;
  background-color: #fff;

  &::placeholder {
    color: #999999;
  }
  &[disabled] {
    background-color: transparent;
  }
}
.btn-group {
  display: flex;
}
.btn-container {
  margin: -1px;
  svg {
    padding: 0 15px;
    transform: translateY(2px);
  }
  &:hover {
    path {
      fill: #fff;
    }
  }
}
.switch {
  position: relative;
  display: none;
  border: none;
  background: transparent;
  margin-right: 8px;

  &:after {
    content: '';
    display: block;

    border-left: 4px solid transparent;
    border-right: 4px solid transparent;

    border-bottom: 4px solid #999999;
  }

  svg {
    transform: translateY(-2px);
  }
  &.hide {
    transform: scaleY(-1);
  }
}

.timer {
  display: flex;
  align-items: center;

  padding-right: 10px;
  font-size: 14px;
  line-height: 17px;

  color: #999999;
}

@media (max-width: 430px) {
  .chat-input {
    padding: 12px 8px;
  }
  .btn-container {
    svg {
      padding: 6px 0;
    }
  }
  .btn-group {
    position: absolute;
    right: 0;
    top: 0px;
    z-index: -8;

    transition: 0.1s;
    &.visible {
      top: -36px;
    }
  }
  .switch {
    display: block;
  }
}
</style>
