<template>
  <login-layout>
    <div class="logo">
      <img src="../assets/logo.svg" alt="Logo" />
    </div>
    <div class="title">Выберите тип пользователя</div>
    <router-link
      class="btn-container"
      :to="{ name: 'studentLogin', query: { roomId: $route.query.roomId } }"
    >
      <ve-button>Ученик</ve-button>
    </router-link>
    <router-link class="btn-container" :to="{ name: 'coachLogin' }">
      <ve-button color="white">Тренер</ve-button>
    </router-link>
  </login-layout>
</template>

<script>
import LoginLayout from '../components/layouts/LoginLayout'
export default {
  components: {
    LoginLayout
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/login.scss";

.btn-container {
  width: 280px;
  height: 50px;

  margin-bottom: 25px;
}
.btn-container:last-child {
  margin-bottom: 124px;
}
</style>
