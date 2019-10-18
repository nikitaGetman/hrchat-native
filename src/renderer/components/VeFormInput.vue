<template>
  <div :class="['field', { required: required }]">
    <span class="label" v-if="label !== ''">{{ label }}</span>
    <div class="input-container">
      <input
        v-bind="$attrs"
        :value="value"
        :class="{ highlighted: error }"
        @input="$emit('input', $event.target.value)"
        :type="isVisible ? 'text' : type"
      />
      <span
        v-if="type === 'password'"
        :class="['icon-btn', isVisible ? 'opened-eye' : 'closed-eye']"
        @click.prevent="isVisible = !isVisible"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 've-input',
  inheritAttrs: false,
  props: {
    required: { type: Boolean, default: false },
    type: { type: String, defualt: () => 'text' },
    label: { type: String, default: '' },
    error: { type: Boolean, default: false },
    value: { type: String, default: '' }
  },
  data: () => {
    return {
      isVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  text-align: left;

  .label {
    position: relative;

    font-size: 16px;
    line-height: 23px;
  }
  &.required .label:after {
    content: '*';
    position: absolute;
    display: block;
    right: -12px;
    top: 0;
    color: #fb1d39;
  }

  input {
    width: 100%;
    padding: 14px 10px 10px;

    font-size: 14px;
    line-height: 20px;

    box-sizing: border-box;
    border: 1px solid #b2b2b2;
    background-color: #fff;

    &.passed {
      border: 1px solid #333333;
    }
    &:focus {
      border: 1px solid #1390e5;
    }
    &.highlighted {
      background: #fbf5f7;
      border: 1px solid #e96980;
    }

    &::-webkit-input-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder {
      color: #999;
    }
  }

  .input-container {
    position: relative;
    .icon-btn {
      position: absolute;
      right: 10px;
      top: 15px;
      bottom: 15px;
      width: 26px;
      border: none;
      background-color: transparent;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.opened-eye {
  background-image: url('../assets/icons/openedEye.svg');
  background-size: cover;
}
.closed-eye {
  background-image: url('../assets/icons/closedEye.svg');
  background-size: cover;
}
</style>
