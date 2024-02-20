<template>
    <div class="task" :style="taskStyle">
      <span class="task_date">
        {{ formatDate(task.deadlineDate) }}
      </span>
      <div class="task_text_contents">
        <h3 class="task_title" @click="selectTask(task)">{{ task.name }}</h3>
        <p class="task_sentence">{{ task.explanation }}</p>
      </div>
      <div class="task_input_contents">
        <SelectComp />
      </div>
    </div>
    <ModalComp body="taskBody" v-model="showModal" @close-modal="showModal = false"/>
</template>

<script>
import SelectComp from '../components/Select.vue'
import ModalComp from './Modal.vue'
import { useTaskStore } from '@/stores/taskStore'

export default {
  name: 'TaskComp',
  components: {
    SelectComp,
    ModalComp
 },
 data() {
  return{
    showModal: false,
    taskStore: useTaskStore()
    }
  },
  props:{
    task: Object
  },
  computed: {
    taskStyle() {
      // 現在の日時より deadlineDate が後であるかをチェック
      const isDeadlineAfterToday = new Date(this.task.deadlineDate) > new Date();
      // 条件に基づいてスタイルオブジェクトを返す
      return {
        backgroundColor: isDeadlineAfterToday ? 'white' : 'rgb(250, 194, 194)',
      };
    }
  },
  //日付の表示変換をするメソッド
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth()は0から始まる
      const day = date.getDate();
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
   },
  // クリックしたタスクを保持する記述
  selectTask(task){
      this.taskStore.specificTask(task)
      // モーダルのステータスも変更
      this.showModal = !this.showModal
    },
  },
}
</script>

<style scoped>
.task {
  background-color: white;
  max-height: 350px;
  width: 300px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  top: 0;
  transition: top left ease 0.2s;
}

.task:hover {
  top: -2px;
  left: -2px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
}

.task_text_contents {
  padding: 30px 45px 0 20px;
}

.task_title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(70, 70, 70);
  font-size: 15px;
  margin-bottom: 10px;
}

.task_sentence {
  overflow: hidden;
  color: rgb(70, 70, 70);
  font-size: 12px;
  text-align: start;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.task_date {
  position: absolute;
  top: 20px;
  left: 20px;
  color: rgb(133, 133, 133);
  font-size: 11px;
}

.task_input_contents {
  padding: 0 20px 20px 20px;
}

</style>