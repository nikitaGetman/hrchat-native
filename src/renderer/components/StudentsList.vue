<template>
  <div class="list-container">
    <div class="title" :class="{ full: isRoomFull }">
      {{ isRoomFull ? "" : students.length + " из " }}{{ maxStudents }}
      {{ correctEnding }}
    </div>
    <ul class="list">
      <li
        class="item"
        v-for="(student, index) in students"
        :key="index"
        :class="{ me: $store.state.user.username === student }"
      >
        <span class="username">{{ student }}</span>
        <button
          v-tooltip.left="{
            content: 'Исключить',
            class: 'tooltip tooltip-deletion'
          }"
          class="delete"
          v-if="$store.state.user.is_trainer"
          @click="deleteStudent(student)"
        ></button>
      </li>
    </ul>
  </div>
</template>

<script>
import { KICK_STUDENT } from '../store/const/actions'

export default {
  name: 'students-list',
  computed: {
    students() {
      return this.$store.state.userlist
    },
    maxStudents() {
      return this.$store.state.room.count_students || 15
    },
    isRoomFull() {
      return this.maxStudents === this.students.length
    },
    correctEnding() {
      if (this.maxStudents === 1) return 'участник'
      if (this.maxStudents < 5) return 'участника'
      return 'участников'
    }
  },
  methods: {
    deleteStudent(student) {
      this.$store.dispatch(KICK_STUDENT, student)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  display: flex;
  flex-direction: column;

  width: 100%;
  max-height: 100%;
  background: #fff;

  font-size: 14px;
  line-height: 20px;

  &:hover .full:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #1390e5;
  }
}
.title {
  padding: 20px;

  color: #fff;
  background-color: #999999;

  &.full {
    color: #000000;
    background-color: #fff;
    position: relative;
  }
}
.list {
  flex: 1 1 auto;
  overflow-y: auto;

  // Firefox scrollbar
  scrollbar-color: #ededed #ffffff;
  scrollbar-width: thin;
  // Webkit scrollbar
  ::-webkit-scrollbar-track {
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    background: #ededed;
  }

  padding: 0;
  margin: 0;

  .item {
    position: relative;
    padding: 20px;
    list-style: none;
    color: #999999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    border: 1px solid #ededed;

    &.me {
      color: #333333;
    }

    .delete {
      position: relative;
      display: block;
      border: none;
      background-color: transparent;
      width: 12px;
      height: 12px;

      overflow: hidden;

      &:hover {
        cursor: pointer;
      }

      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;

        width: 18px;
        height: 1px;
        background-color: #eb5940;
        top: 50%;
        left: -25%;
        transform-origin: center;
      }
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
    }
  }
}

@media (max-width: 430px) {
  .title {
    background: #ededed;
    color: #333333;
  }
  .list {
    .item {
      border: none;
    }
  }
}
</style>
