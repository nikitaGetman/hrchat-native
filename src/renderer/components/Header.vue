<template>
  <div class="wrapper">
    <div class="logo"></div>
    <div class="username">{{ name }}</div>
    <div class="logout-btn">
      <button @click="logout">Выйти</button>
      <div class="burger-menu" @click="showMenu = true">
        <span></span>
      </div>
    </div>

    <div :class="['menu', { shown: showMenu }]" @click.self="showMenu = false">
      <div class="menu-container">
        <div class="list-container" v-if="$store.state.user.room_id">
          <students-list></students-list>
        </div>
        <button class="menu-logout-btn" @click="logout">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import StudentsList from './StudentsList'
import { LOGOUT } from '../store/const/actions'

export default {
  components: {
    StudentsList
  },
  data: () => {
    return {
      showMenu: false
    }
  },
  computed: {
    name() {
      return this.$store.state.user.username
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;

  height: 60px;

  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);

  font-size: 18px;

  .logo {
    width: 118px;
    height: 36px;
    margin-left: 15px;

    background-image: url('../assets/logo.svg');
    background-size: cover;
  }
  .username {
    flex: 1;
    padding: 0 20px 0 15px;
    text-align: right;
    color: #999999;
  }
  .logout-btn {
    height: 100%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    border-left: 1px solid #ededed;

    button {
      color: #eb5940;
      background: transparent;
      border: none;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .burger-menu {
      display: none;
    }
  }
}
.menu {
  display: none;
}

@media (max-width: 430px) {
  .header {
    height: 56px;
    .logo {
      width: 32px;
      height: 38px;
      background-image: url('../assets/logo-small.svg');
    }
    .username {
      text-align: left;
    }
    .logout-btn {
      font-size: 14px;
      border-left: none;
      width: 60px;
      padding: 0;

      &:hover {
        cursor: pointer;
      }

      button {
        display: none;
      }
      .burger-menu {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          display: block;
          position: relative;

          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #1390e5;

          &:after,
          &:before {
            content: '';
            position: absolute;
            display: block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #1390e5;
          }
          &:before {
            top: -8px;
          }
          &:after {
            bottom: -8px;
          }
        }
      }
    }
  }
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(50, 50, 50, 0.502463);

    &.shown {
      display: block;
    }

    .menu-container {
      position: fixed;
      top: 16px;
      right: 10px;
      width: 242px;
      background-color: #fafafa;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

      .menu-logout-btn {
        display: block;
        width: 100%;
        padding: 14px 16px;
        color: #eb5940;
        font-size: 14px;
        line-height: 20px;
        background: transparent;
        border: none;

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .list-container {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }
    }
  }
}
</style>
