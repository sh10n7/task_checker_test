import { defineStore } from "pinia";
import apiClient from "../api/axios";

export const useGenreStore = defineStore('genre', {
  state: () => ({
    genres: [], // genresを配列として初期化
  }),

  actions: {
    // 全部のジャンルデータを取得する
    async fetchAllGenres() {
      try {
        const response = await apiClient.get('/genres');
        this.genres = response.data;
      } catch (error) {
        console.error('ジャンルデータの取得ができませんでした。', error);
      }
    },
    async addGenre(newGenre){
      try {
        const response = await apiClient.post('/genres', newGenre)
        const addedGenre = response.data
        // 追加したジャンルデータをthis.genresに追加する。
        this.genres.push({
          id: addedGenre.id,
          name: addedGenre.name
        })
      } catch (error) {
        console.log("保存ができませんでした", error);
      }
    },
    async removeGenre(removeId) {
      try {
        // サーバーからジャンルを削除
        await apiClient.delete(`/genres/${removeId}`);
        // ストアの状態からも削除
        this.genres = this.genres.filter(genre => genre.id !== removeId);
      } catch (error) {
          console.error('ジャンルの削除に失敗しました。', error);
      }
    },
  }
})