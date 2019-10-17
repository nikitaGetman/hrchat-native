<template>
  <main-layout>
    <div class="content">
      <form @submit.prevent="createRoom" class="form">
        <h2 class="title">Создать комнату</h2>
        <div class="error-container">
          <p class="error" v-for="(error, index) in errors" :key="index">
            {{ error }}
          </p>
        </div>

        <div class="field required">
          <span class="label">Тип тренинга</span>
          <div
            class="checkbox"
            :class="{ active: is_championship }"
            @click="is_championship = true"
          >
            Чемпионат
          </div>
          <div
            class="checkbox"
            :class="{ active: !is_championship }"
            @click="is_championship = false"
          >
            На выбывание
          </div>
        </div>

        <div class="field required">
          <label for="people" class="label">Количество человек в комнате</label>
          <input type="number" name="people" v-model="students" />
        </div>

        <div class="field required">
          <label for="rounds" class="label">Количество раундов</label>
          <input type="number" name="rounds" v-model="rounds" />
        </div>

        <div class="field required">
          <label for="time" class="label">Время на ответ (сек)</label>
          <input type="number" name="time" v-model="timer" />
        </div>

        <div class="btn-container">
          <ve-button type="submit">Создать</ve-button>
        </div>
      </form>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../components/layouts/MainLayout'
import { GET_ROOM_CREATION_PARAMS, CREATE_ROOM } from '../store/const/actions'

export default {
  components: {
    MainLayout
  },
  data: () => {
    return {
      is_championship: true,
      students: 0,
      rounds: 0,
      timer: 0,
      errors: []
    }
  },
  created () {
    this.$store.dispatch(GET_ROOM_CREATION_PARAMS)
  },
  methods: {
    validateFields () {
      this.errors = []
      const params = this.$store.state.room_creation_params

      if (
        parseInt(this.students) < params.student_minimum ||
        parseInt(this.students) > params.student_maximum
      ) {
        this.errors.push(
          'Количество пользователей должно быть не меньше ' +
            params.student_minimum +
            ' и не больше ' +
            params.student_maximum
        )
      }
      if (
        parseInt(this.rounds) < params.round_minimum ||
        parseInt(this.rounds) > params.round_maximum
      ) {
        this.errors.push(
          'Количество раундов должно быть не меньше ' +
            params.round_minimum +
            ' и не больше ' +
            params.round_maximum
        )
      }
      if (
        parseInt(this.timer) < params.timer_minimum ||
        parseInt(this.timer) > params.timer_maximum
      ) {
        this.errors.push(
          'Количество секунд на ответ должно быть не меньше ' +
            params.timer_minimum +
            ' и не больше ' +
            params.timer_maximum
        )
      }

      return this.errors.length === 0
    },
    createRoom () {
      if (this.validateFields()) {
        this.$store
          .dispatch(CREATE_ROOM, {
            count_students: this.students,
            timer: this.timer,
            total_rounds: this.rounds,
            is_championship: this.is_championship
          })
          .then(() => {
            this.$router.push({
              name: 'chat',
              query: { roomId: this.$store.state.user.room_id }
            })
          })
          .catch(err => {
            this.errors = [err.response.data.detail]
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 37px 20px;
  background-color: #fff;

  .form {
    display: flex;
    flex-direction: column;
  }

  .title {
    margin: 0 0 20px;
    font-weight: 600;
    font-size: 34px;
    line-height: 49px;
    color: #1390e5;
  }

  .error {
    font-size: 14px;
    color: #fb1d39;
  }

  .field {
    margin-bottom: 20px;
    .label {
      position: relative;
      margin-right: 34px;
      font-size: 14px;
    }
    &.required .label:after {
      content: "*";
      position: absolute;
      display: block;
      right: -12px;
      top: 0;
      color: #fb1d39;
    }

    .checkbox {
      margin-right: 10px;
      padding: 14px 10px;
      display: inline-block;
      font-weight: 400;
      font-size: 14px;
      color: #999999;
      border: 1px solid #ededed;

      &:hover {
        cursor: pointer;
      }

      &.active {
        color: #1390e5;
        border-color: #1390e5;
      }
    }

    input[type="number"] {
      width: 34px;
      height: 45px;
      font-size: 14px;
      text-align: center;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }

  .btn-container {
    width: 240px;
    height: 50px;
  }
}

@media (max-width: 430px) {
  .content {
    box-sizing: border-box;
    height: 100%;
    .error {
      font-size: 12px;
    }
  }

  .form {
    align-items: center;

    .title {
      font-size: 26px;
      line-height: 37px;
      margin-bottom: 25px;
    }

    .field:not(:nth-child(3)) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label {
        margin-right: 10px;
      }
    }
    .field:nth-child(3) {
      .label {
        display: block;
        margin-bottom: 10px;
        &:after {
          left: 90px;
          right: unset;
        }
      }
    }

    .btn-container {
      width: 264px;
    }
  }
  .form > * {
    width: 100%;
  }
}
</style>
