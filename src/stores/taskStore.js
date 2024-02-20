import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [], // tasksを配列として初期化
    filteredTasks: [],
    selectedGenreId: null, // 初期値のジャンルidを指定(プルダウン)
    selectedTask: null // クリック時に選択したタスクを管理する
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
    // ジャンルデータ変更に伴うタスクのフィルタリング
    async filterTasks(genreId) {
      //取得したselectedGenreIdとtaskのidが同一だったらthis.tasksのデータを更新
      if(genreId === 0) {
        this.filteredTasks = [...this.tasks];
      } else {
        this.filteredTasks = this.tasks.filter(task => genreId === task.genreId)
      }
    },
    // タスクの追加
    async addTask(newTask) {
      try {
        const response = await axios.post('http://localhost:5000/tasks', newTask)
        const addedTask = response.data;
        this.tasks.push(addedTask)
      } catch (error) {
        console.log("保存ができませんでした", error);
      }
    },
    specificTask(selectedTask) {
      this.selectedTask = selectedTask;
    },
    // タスクの削除
    async removeTask(task) {
      try{
        const response = await axios.delete(`http://localhost:5000/tasks/${task.id}`, task); 
        const index = this.tasks.findIndex(task => task.id === response.data.id);
        if (index !== -1) {
          this.tasks.splice(index, 1);
        }
        //this.tasksの配列から特定のデータを削除する
      } catch(error) {
        console.log('タスクの削除に失敗しました。', error)
      }
    }
    
  }
})