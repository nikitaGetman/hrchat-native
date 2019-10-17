<template>
  <button class="btn" :class="[color, { inversed, tile }]" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: 've-button',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    tile: {
      type: Boolean,
      default: false
    },
    inversed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
// COLORS:
$primary: #1390e5;
$orange: #eb5940;
$purple: #761c7d;
$disabled: #b2b2b2;
$white: #ffffff;

$primaryHovered: #32a3eb;
$orangeHovered: #eb7b40;
$purpleHovered: #8e4a99;

.btn {
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  border: none;
  border-width: 2px;
  border-style: solid;
  border-radius: 23px;

  font-size: 14px;
  font-weight: normal;
  color: $white;

  transition: 0.1s;

  &:hover {
    cursor: pointer;
  }
}
.btn[disabled] {
  background-color: $disabled;
  color: $white;
  &:hover {
    background-color: $disabled;
    color: $white;
    cursor: default;
  }
}

.primary {
  border-color: $primary;
  background-color: $primary;
  &:hover {
    color: $primary;
    background-color: $white;
  }
}
.orange {
  color: $white;
  border-color: $orange;
  background-color: $orange;
  &:hover {
    color: $orange;
    background-color: $white;
  }
}

.white {
  color: $primary;
  border-color: $primary;
  background-color: $white;
  &:hover {
    color: $white;
    background-color: $primary;
  }
}

.tile {
  border-radius: 0;
  border: none;

  &.primary {
    background-color: transparent;
    &:hover {
      color: $primary;
      background-color: $primary;
    }
  }
  &.orange {
    color: $white;
    background-color: transparent;
    &:hover {
      color: $orange;
      background-color: $orange;
    }
  }
}
.tile[disabled] {
  &:hover {
    background-color: transparent;
  }

  path {
    fill: $disabled;
  }
}
</style>
