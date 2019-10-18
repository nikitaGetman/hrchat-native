<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'main-layout'
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  box-sizing: border-box;
  padding: 60px 0 0;
}
@media (max-width: 430px) {
  .container {
    padding: 56px 0 0;
  }
}
</style>
