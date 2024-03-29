import { defineStore } from "pinia";
import apiClient from "../api/axios";

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
        const response = await apiClient.get('/tasks');
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
        const response = await apiClient.post('/tasks', newTask)
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
        const response = await apiClient.delete(`/tasks/${task.id}`, task); 
        const index = this.tasks.findIndex(t => t.id === response.data.id);
        if (index !== -1) {
          this.tasks.splice(index, 1);
        }
        //this.tasksの配列から特定のデータを削除する
      } catch(error) {
        console.log('タスクの削除に失敗しました。', error)
      }
    },
    async updateTask(task) {
      try{
        const response = await apiClient.put(`/tasks/${task.id}`, task)
        //response.data.idと同じidのデータをthis.tasksから探し、response.dataのデータを上書きする。
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
      }catch(error){
        console.log('タスクの更新に失敗しました', error);
      }
    },
    async updateTaskStatus(taskId, newStatus){
      try{
        // taskのステータス更新のリクエストを送る
        await apiClient.put(`/tasks/${taskId}/status`, {newStatus: newStatus})

        //更新したステータスを該当タスクのステータスに紐付けする
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
          this.tasks[index].status = newStatus
        }
      }catch(error){
        console.log("ステータスの更新に失敗しました", error)
      }
    }
  }
})