import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [], // tasksを配列として初期化
    filteredTasks: [],
    selectedGenreId: 0, // 初期値のジャンルidを指定(プルダウン)
  }),

  actions: {
    // 全部のタスクデータを取得する
    async fetchAllTasks() {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        this.tasks = response.data;
        //初回読み込み時に、this.filteredTasksも全タスクを取得しておく。そうすることでフィルタがかかってない状態で全タスクを選択できる
        this.filteredTasks = this.tasks;
      } catch (error) {
        console.error('タスクデータの取得ができませんでした。', error);
      }
    },
    async filterTasks(genreId) {
      console.log(genreId)
      //取得したselectedGenreIdとtaskのidが同一だったらthis.tasksのデータを更新
      if(genreId === 0) {
        this.filteredTasks = [...this.tasks];
      } else {
        this.filteredTasks = this.tasks.filter(task => genreId === task.genreId)
        console.log(this.filteredTasks)
      }
    }

    
  }
})