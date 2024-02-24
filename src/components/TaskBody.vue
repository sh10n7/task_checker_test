<template>
    <form class="modal_body">
      <h2 class="input_menu">タスクを追加</h2>
      <div>
        <h4 class="input_title">ジャンル</h4>
        <div class="task_genre">
          <SelectComp :genres="genreStore.genres" :value="task.genreId" @change="genreSelect"/>
        </div>
        <h4 class="input_title">タイトル</h4>
        <input type="text" v-model="task.name"/>
        <h4 class="input_title">説明</h4>
        <textarea v-model="task.explanation" />
        <h4 class="input_title">期限</h4>
        <input class="input_date" type="date" v-model="task.deadlineDate"/>
      </div>
      <input class="input_submit" type="button" value="送信" @click="submit"/>
      <!-- taskが存在するか、またidプロパティがtaskオブジェクトに存在するかをチェック。 -->
      <button v-if="task && task.id" type="button" class="delete_button" @click="deleteTask">
        このタスクを削除する
      </button>
    </form>
</template>

<script>
import SelectComp from './Select.vue'
import { useTaskStore } from '../stores/taskStore'
import { useGenreStore } from '../stores/genreStore'

export default {
  name: 'TaskBodyComp',
  components: {
    SelectComp
  },
  data() {
    return{
      task: {
        name: '',
        explanation: '',
        deadlineDate: '',
        status: 0,
        genreId: ''
      },
      taskStore: useTaskStore(),
      genreStore: useGenreStore()
    }
  },
  methods: {
    async submit() {
      if(this.task.id) {
        try{
          await this.taskStore.updateTask(this.task);
          this.$emit("close-modal")
        }catch(error){
          console.log("!タスクの更新ができませんでした", error);
        }
      } else {
        try {
          await this.taskStore.addTask(this.task);
          this.$emit("close-modal");
        }catch(error) {
          console.log("タスクの登録ができませんでした", error)
        }
      }
    },
    genreSelect(e) {
      this.task.genreId = Number(e.target.value)
    },
    async deleteTask() {
      try {
        await this.taskStore.removeTask(this.task);
        this.taskStore.selectedTask = null;
        this.$emit("close-modal")
      }catch(error) {
        console.log("タスクの削除ができませんでした", error)
      }
    }
  },
  async mounted(){
    if(this.taskStore.selectedTask) {
      this.task = await {...this.taskStore.selectedTask}
    }
  }

}
</script>

<style>
  .modal_body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .genre_title {
    width: 200px;
    display: flex;
    justify-content: space-between;
  }
  .input_title {
    height: 3px;
  }
  input,
  textarea {
    border: none;
    background-color: #f3f3f3;
    padding: 16px;
    border-radius: 5px;
    width: 230px;
    line-height: 1.5em;
  }
  .delete_button {
    margin-top: 20px;
    border-style: none;
    font-size: 12px;
    color: rgb(196, 82, 53);
    border-bottom: medium solid rgb(196, 82, 53);
  }
  .input_submit {
    margin-top: 30px;
    background-color: rgb(66, 163, 247);
    color: white;
    border-radius: 25px;
    border-style: none;
    padding: 16px 40px;
    font-size: 15px;
  }
</style>
