import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [], // tasksを配列として初期化
  }),

  actions: {
    // 全部のタスクデータを取得する
    async fetchAllTasks() {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('タスクデータの取得ができませんでした。', error);
      }
    },
    
  }
})