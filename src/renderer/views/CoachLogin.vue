<template>
  <login-layout>
    <div class="logo">
      <img src="../assets/logo.svg" alt="Logo" />
    </div>
    <button class="back-btn" @click="goBack"></button>
    <div class="title">Войти в личный кабинет</div>
    <div :class="['error-container', { invisible: errors.length === 0 }]">
      <div class="error-msg" v-for="(e, index) in errors" :key="index">{{ e }}</div>
    </div>

    <!-- form for logining as Coach -->
    <form @submit.prevent="loginAsCoach">
      <div class="input-container">
        <ve-input
          required
          label="Логин"
          v-model="login.value"
          :error="login.error"
          type="text"
          name="login"
          placeholder="Login"
        ></ve-input>
      </div>

      <div class="input-container">
        <ve-input
          required
          label="Пароль"
          v-model="password.value"
          :error="password.error"
          type="password"
          name="password"
        ></ve-input>
      </div>

      <div class="btn-container">
        <ve-button color="primary" type="submit">Войти</ve-button>
      </div>
    </form>
  </login-layout>
</template>

<script>
import LoginLayout from '../components/layouts/LoginLayout'
import { LOGIN } from '../store/const/actions'

export default {
  components: {
    LoginLayout
  },
  data() {
    return {
      login: { value: '', error: false },
      password: { value: '', error: false },
      passwordVisible: false,
      errors: []
    }
  },
  methods: {
    validateFields() {
      this.login.error = this.login.value === ''
      this.password.error = this.password.value === ''

      if (this.login.error || this.password.error) return false
      return true
    },
    goBack() {
      this.$router.push('/')
    },
    loginAsCoach() {
      if (this.validateFields()) {
        this.$store
          .dispatch(LOGIN, {
            username: this.login.value,
            password: this.password.value,
            isTrainer: true
          })
          .then(res => {
            if (res.room_id) {
              this.$router.push({
                name: 'chat',
                query: { roomId: res.room_id }
              })
            } else {
              this.$router.push({ name: 'createRoom' })
            }
          })
          .catch(err => {
            if (!err.response) {
              this.errors = ['Ошибка соединения с сервером.']
            } else {
              this.errors = [err.response.data.detail]
            }
          })
      } else {
        this.errors = ['Заполните все указанные поля.']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/login.scss';

.title {
  margin-bottom: 0;
}
.logo {
  margin-bottom: 40px;
}

.input-container {
  width: 240px;
  margin-bottom: 20px;
}

.btn-container {
  width: 240px;
  height: 50px;

  margin-top: 5px;
}
.btn-container:last-child {
  margin-bottom: 150px;
}
@media (max-width: 400px) {
  .btn-container,
  .input-container {
    width: 280px;
  }
}
</style>
