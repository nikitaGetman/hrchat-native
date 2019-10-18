<template>
  <main-layout>
    <div class="wrapper">
      <div class="chat-container">
        <div class="chat">
          <div class="msgs-wrapper" ref="container">
            <div class="msgs-container">
              <chat-message
                v-for="(msg, index) in messages"
                :key="index"
                :from="msg.from"
                :text="msg.text"
                :time="msg.time"
                :fromAdmin="msg.fromAdmin"
                :isLocked="msg.locked"
                :isChecked="msg.checked"
                @ticked="messageTicked(msg)"
              />
              <span
                v-if="$store.state.is_admin_writing"
                class="admin-writing"
                :class="{ now: adminWriting }"
              >Администратор печатает...</span>
            </div>
          </div>
          <div class="chat-control-container">
            <chat-input></chat-input>
          </div>
        </div>
      </div>
      <div class="userlist-container">
        <students-list></students-list>
      </div>
    </div>

    <ve-alert
      v-if="alertMessage"
      :title="alertMessage.title"
      :text="alertMessage.text"
      :cancelBtnText="alertMessage.cancelBtnText"
      :confirmBtnText="alertMessage.confirmBtnText"
      @cancel="alertMessage.onCancel"
      @continue="alertMessage.onContinue"
    ></ve-alert>
  </main-layout>
</template>

<script>
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import StudentsList from '../components/StudentsList'
import MainLayout from '../components/layouts/MainLayout'
import {
  SOCKET_CONNECT,
  DENY_READINESS,
  CONFIRM_READINESS,
  LOGOUT,
  MARK_ANSWER
} from '../store/const/actions'
import { SET_EVENT, RESET_ROOM_DATA } from '../store/const/mutations'

export default {
  components: {
    ChatMessage,
    ChatInput,
    StudentsList,
    MainLayout
  },
  data: () => {
    return {
      adminWriting: true
    }
  },
  computed: {
    alertMessage() {
      const event = this.$store.state.chat_event

      const alertMessages = {
        trainer: {
          training_finished: {
            title: 'Тренинг окончен',
            text:
              'Если Вы хотите остаться в чате, нажмите кнопку «Остаться». Для того чтобы перейти на страницу завершения тренинга, и ознакомиться с результатами, нажмите кнопку «Завершить».',
            onCancel: this.stillInRoom,
            onContinue: this.openTrainingFinishedView,
            cancelBtnText: 'Остаться',
            confirmBtnText: 'Завершить'
          }
        },
        student: {
          check_readiness: {
            title: 'Вы готовы?',
            text:
              'До начала тренинга остается «20 сек.». Нажмите «Продолжить», если вы готовы начинать.',
            onCancel: this.denyReadiness,
            onContinue: this.confirmReadiness
          },
          kicked_by_trainer: {
            title: 'Вас удалили',
            text: 'Коллега, к сожалению, вас удалили из комнаты.',
            onCancel: this.logout,
            onContinue: this.stillInRoom
          },
          loss: {
            title: 'Вы проиграли',
            text:
              'Коллега, к сожалению, вы выбыли из тренинга. Если вы желаете наблюдать за игрой, нажмите «Продолжить». Для того чтобы закончить чат, нажмити кнопку «Выйти»',
            onCancel: this.logout,
            onContinue: this.stillInRoom
          },
          training_finished: {
            title: 'Тренинг окончен',
            text:
              'Для того чтобы остаться в чате, и ознакомиться с ответами, нажмите кнопку «Продолжить». Если Вам это не нужно, нажмите кнопку «Выйти»',
            onCancel: this.logout,
            onContinue: this.stillInRoom
          }
        }
      }

      if (event) {
        if (this.$store.state.user.is_trainer) {
          return alertMessages.trainer[event]
        }
        return alertMessages.student[event]
      }
      return null
    },
    messages() {
      return this.$store.state.messages
    }
  },
  watch: {
    messages() {
      this.$nextTick().then(() => {
        const container = this.$refs.container
        container.scrollTop = container.scrollHeight
      })
    }
  },
  methods: {
    messageTicked(msg) {
      if (!msg.checked) {
        this.$store.dispatch(MARK_ANSWER, msg.from)
        msg.checked = !msg.checked
      }
    },
    denyReadiness() {
      this.$store.dispatch(DENY_READINESS)
      this.logout()
    },
    confirmReadiness() {
      this.$store.dispatch(CONFIRM_READINESS)
    },
    logout() {
      this.$store.dispatch(LOGOUT)
    },
    stillInRoom() {
      this.$store.commit(SET_EVENT, '')
    },
    openTrainingFinishedView() {
      this.$store.commit(RESET_ROOM_DATA)
      this.$router.push({ name: 'trainingFinished' })
    }
  },
  created() {
    this.$store.dispatch(SOCKET_CONNECT)
  },
  errorCaptured(err) {
    if (err.toString() === 'TypeError: this.connection is null') {
      this.$store.commit(SET_EVENT, 'training_finished')
    }
    return false
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
}

.chat-container {
  height: 100%;
  box-sizing: border-box;
  // margin-right: 20px;
  padding: 20px 0;

  background-color: #ffffff;
  flex: 1 1 910px;
}

.userlist-container {
  flex: 1 1 310px;
}

.chat {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 70px;

  .msgs-wrapper {
    height: 100%;
    padding: 0 20px;

    overflow-y: auto;
    // Firefox scrollbar
    scrollbar-color: #ededed #ffffff;
    scrollbar-width: thin;
    // Webkit scrollbar
    ::-webkit-scrollbar-track {
      background: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
      background: #ededed;
    }

    .msgs-container {
      min-height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }

  .chat-control-container {
    padding: 0 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.admin-writing {
  display: block;
  color: transparent;
  font-size: 10px;
  line-height: 12px;

  &.now {
    color: #999999;
  }
}

@media (max-width: 430px) {
  .chat-container {
    padding: 8px 0;
    margin-right: 0;

    .chat {
      padding-bottom: 50px;
    }
    .wrapper,
    .chat-control-container {
      padding: 0 8px;
    }

    .input-container {
      height: 40px;
    }
  }
  .userlist-container {
    display: none;
  }
}
</style>
