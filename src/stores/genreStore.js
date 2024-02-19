import { defineStore } from "pinia";
import axios from "axios";

export const useGenreStore = defineStore('genre', {
  state: () => ({
    genres: [], // genresを配列として初期化
  }),

  actions: {
    // 全部のジャンルデータを取得する
    async fetchAllGenres() {
      try {
        const response = await axios.get('http://localhost:5000/genres');
        this.genres = response.data;
      } catch (error) {
        console.error('ジャンルデータの取得ができませんでした。', error);
      }
    },
    async addGenre(newGenre){
      console.log(newGenre)
      try {
        const response = await axios.post('http://localhost:5000/genres', newGenre)
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
        await axios.delete(`http://localhost:5000/genres/${removeId}`);
        // ストアの状態からも削除
        this.genres = this.genres.filter(genre => genre.id !== removeId);
      } catch (error) {
          console.error('ジャンルの削除に失敗しました。', error);
      }
    }
  }
})