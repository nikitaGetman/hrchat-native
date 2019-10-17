<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'login-layout'
}
</script>

<style lang="scss" scoped>
.container {
  width: 400px;
  background-color: #ffffff;

  margin: 64px auto 0;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
}
@media (max-width: 430px) {
  .container {
    margin: 0 0;
    height: 100vh;
    width: 100vw;
  }
}
</style>
