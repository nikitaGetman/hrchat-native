<template>
  <div class="msg-container" :class="{ 'from-admin': fromAdmin }">
    <div class="username">{{ fromAdmin ? "Администратор" : from }}</div>
    <div class="content" :class="{ active: isChecked, locked: isLocked }">
      <div class="text" v-if="!isLocked" v-html="formatedText"></div>
      <div class="time" v-if="!isLocked">{{ time }}</div>
    </div>
    <div
      class="checkbox"
      :class="{ checked: isChecked }"
      v-if="isMeAdmin && !fromAdmin"
      @click="changeState"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'chat-message',
  props: {
    from: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true },
    isChecked: { type: Boolean, required: true },
    fromAdmin: { type: Boolean, required: true },
    isLocked: { type: Boolean, required: true }
  },
  computed: {
    isMeAdmin() {
      return this.$store.state.user.is_trainer
    },
    formatedText() {
      return this.text.split('\n').join('<br/>')
    }
  },
  methods: {
    changeState() {
      this.$emit('ticked')
    }
  }
}
</script>

<style lang="scss" scoped>
.msg-container {
  position: relative;
  width: 49%;
  margin-bottom: 20px;
  align-self: flex-end;

  .username {
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    margin-bottom: 8px;
  }
  .content {
    position: relative;
    padding: 20px 20px 19px;
    background-color: #ededed;

    &.active {
      background-color: #1390e5;
      .text {
        color: #ffffff;
      }
      .time {
        color: #ededed;
      }
    }

    &.locked {
      height: 20px;
      background-image: url('../assets/icons/lock.svg');
      background-repeat: no-repeat;
      background-position: center;
      .text {
        color: transparent;
      }
    }

    .text {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #333333;
    }
    .time {
      position: absolute;
      bottom: 5px;
      right: 10px;
      font-family: Roboto;
      font-size: 8px;
      line-height: 11px;
      text-align: right;
      color: #999999;
    }
  }

  .checkbox {
    position: absolute;
    left: -36px;
    top: 22px;
    width: 16px;
    height: 16px;
    box-sizing: border-box;

    border: 1px solid #ededed;
    border-radius: 50%;

    &.checked {
      border-color: #1390e5;
      background-image: url('../assets/icons/check.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &.from-admin {
    align-self: flex-start;

    .username {
      text-align: left;
    }
    .content {
      background-color: #1390e5;
      .text {
        color: #ffffff;
      }
      .time {
        color: #ededed;
      }
    }
  }
}
@media (max-width: 430px) {
  .msg-container {
    width: 80%;
    margin-bottom: 16px;

    .content {
      padding: 16px;
      .time {
        bottom: 3px;
        right: 8px;
      }
    }
  }
}
</style>
