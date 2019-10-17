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
  height: 100%;
  box-sizing: border-box;
  padding: 83px 20px 20px;
}
@media (max-width: 430px) {
  .container {
    padding: 64px 8px 8px;
  }
}
</style>
