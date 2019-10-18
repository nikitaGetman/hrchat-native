<template>
  <div class="modal-container">
    <div class="modal-view">
      <h3 class="title">{{ title }}</h3>
      <p class="text">{{ text }}</p>
      <div class="control" :class="{ centered: !cancelable }">
        <button class="cancel" @click="$emit('cancel')" v-if="cancelable">{{ cancelBtnText }}</button>
        <button class="continue" @click="$emit('continue')">{{ confirmBtnText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 've-alert',
  props: {
    title: { type: String },
    text: { type: String },
    cancelable: { type: Boolean, default: true },
    cancelBtnText: { type: String, default: 'Выход' },
    confirmBtnText: { type: String, default: 'Продолжить' }
  }
}
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000000;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.4);
}
.modal-view {
  padding: 40px;
  width: 320px;
  background: #fff;
}
.title {
  margin: 0 0 12px;

  font-size: 20px;
  line-height: 29px;
  color: #000000;
}
.text {
  margin: 0 0 21px;
  font-size: 16px;
  line-height: 23px;
  color: #000000;
}
.control {
  display: flex;
  justify-content: space-between;

  &.centered {
    justify-content: center;
  }

  button {
    padding: 0;
    background-color: transparent;
    border: none;
    font-size: 16px;
    line-height: 23px;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.cancel {
  color: #fb1d39;
}
.continue {
  color: #1390e5;
  justify-self: center;
}
</style>
