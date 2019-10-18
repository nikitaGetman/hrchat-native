<template>
  <main-layout>
    <div class="wrapper">
      <button class="back-btn" @click="toMain">
        <span class="icon-back"></span>Вернуться на главную страницу
      </button>
      <h2 class="title">Тренинг окончен</h2>
      <p class="text">Для того чтобы скачать результаты тренинга, нажмите кнопку «Скачать»</p>
      <button class="download-btn" @click="download">
        Скачать подробную информацию
        <span class="format">XLS</span>
        <span class="icon-download"></span>
      </button>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../components/layouts/MainLayout'

export default {
  components: {
    MainLayout
  },
  methods: {
    toMain() {
      this.$router.push({ name: 'createRoom' })
    },
    download() {
      console.log('Downloading file...')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  padding: 15px 20px 80px;
  max-width: 910px;

  background-color: #ffffff;

  .back-btn {
    margin-bottom: 10px;

    background: transparent;
    border: none;
    font-size: 10px;
    line-height: 14px;

    text-transform: uppercase;
    color: #333333;
    transition: 0.1s;

    &:hover {
      transform: translateX(-5px);
      cursor: pointer;
    }

    .icon-back {
      display: inline-block;
      width: 14px;
      height: 7px;
      margin-right: 10px;

      background-image: url('../assets/icons/arrowLeft_dark.svg');

      background-size: cover;
    }
  }

  .title {
    margin: 0 0 21px;

    font-size: 34px;
    line-height: 49px;
    color: #1390e5;
  }

  .text {
    margin-bottom: 21px;

    font-size: 14px;
    line-height: 20px;
    color: #000000;
  }

  .download-btn {
    position: relative;
    padding-right: 26px;
    background: transparent;
    border: none;
    font-size: 14px;
    line-height: 20px;

    color: #1390e5;

    &:hover {
      cursor: pointer;
      color: #999999;
    }
    .format {
      padding: 0 10px;
      font-size: 14px;
      line-height: 20px;

      color: #999999;

      border-right: 1px solid #999999;
    }

    .icon-download {
      position: absolute;
      display: block;
      width: 16px;
      height: 16px;
      top: 0;
      right: 0;

      background-image: url('../assets/icons/download.svg');

      background-size: cover;
      background-position: center;
    }
  }
}

@media (max-width: 430px) {
  .wrapper {
    height: 100%;

    .title {
      margin-bottom: 25px;
      font-size: 26px;
      line-height: 37px;
    }
    .download-btn {
      margin-right: 65px;
      padding: 0 0 0 28px;

      text-align: left;

      .format {
        border-right: none;
        text-transform: lowercase;
        &:before {
          content: '(.';
        }
        &:after {
          content: ' )';
        }
      }

      .icon-download {
        left: 0;
      }
    }
  }
}
</style>
