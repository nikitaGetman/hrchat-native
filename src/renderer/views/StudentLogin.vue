<template>
  <login-layout>
    <div class="logo">
      <img src="../assets/logo.svg" alt="Logo" />
    </div>
    <button class="back-btn" @click="goBack"></button>
    <div class="title">Войти в чат</div>
    <div class="error-container" :class="{ invisible: errors.length === 0 }">
      <div class="error-msg" v-for="(e, index) in errors" :key="index">{{ e }}</div>
    </div>

    <!-- form for logining as Student -->
    <form @submit.prevent="loginAsStudent">
      <div class="input-container">
        <ve-input
          required
          label="Имя Фамилия"
          v-model="name.value"
          :error="name.error"
          type="text"
          name="name"
          placeholder="Александр Александров"
        ></ve-input>
      </div>

      <div class="input-container">
        <ve-input
          required
          label="ID"
          v-model="roomId.value"
          :error="roomId.error"
          type="password"
          name="id"
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
      name: { value: '', error: false },
      roomId: { value: '', error: false },
      idVisible: false,
      errors: []
    }
  },
  created() {
    this.roomId.value = this.$route.query.roomId || ''
  },
  methods: {
    validateFields() {
      this.name.error = this.name.value === ''
      this.roomId.error = this.roomId.value === ''

      if (this.name.error || this.roomId.error) return false
      return true
    },
    goBack() {
      this.$router.push({
        path: '/',
        query: { roomId: this.$route.query.roomId }
      })
    },
    loginAsStudent() {
      console.log('Logining')
      console.log(this.$store)
      if (this.validateFields()) {
        this.$store
          .dispatch(LOGIN, {
            nickname: this.name.value,
            roomId: this.roomId.value,
            isTrainer: false
          })
          .then(() => {
            this.$router.push({
              name: 'chat',
              query: { roomId: this.roomId.value }
            })
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
