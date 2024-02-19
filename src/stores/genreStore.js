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
    
  }
})