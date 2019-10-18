<template>
  <div id="app">
    <loader v-if="$store.state.auth_status === 'loading'" />

    <router-view class="header" name="header" />
    <router-view />
  </div>
</template>

<script>
import Loader from './components/Loader.vue'
export default {
  components: {
    Loader
  }
}
</script>

<style lang="scss">
@import './assets/css/general.scss';

#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  background-color: #ededed;
  color: #1d1d1d;
  font-family: 'GT Walsheim';
  font-weight: normal;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
