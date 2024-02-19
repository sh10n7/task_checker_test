<template>
  <div className="modal_body">
      <ul>
        <li class="genre_title" v-for="genre in genreStore.genres" :key="genre.id">
          <span>{{ genre.name }}</span>
          <CancelIcon @click="deleteGenre(genre.id)"/>
        </li>
      </ul>
      <form>
        <input type="text" v-model="genre.name"/>
        <input class="input_submit" type="button" value="追加" @click="submitGenre"/>
      </form>
  </div>
</template>
<script>
import CancelIcon from 'vue-material-design-icons/CloseCircle.vue'
import { useGenreStore } from '../stores/genreStore'
export default {
  name: 'GenreBodyComp',
  components: {
    CancelIcon
  },
  data(){
    return{
      genre: {
        name: ''
      },
      genreStore: useGenreStore(),
    }
  },
  methods: {
    async submitGenre() {
      // genreStore.addGenre()を呼び出す
      try {
        await this.genreStore.addGenre(this.genre)
        this.genre.name = ''
      } catch(error) {
        console.log('ジャンルの保存ができませんでした', error);
      }
    },
    async deleteGenre(genreId) {
      try {
        await this.genreStore.removeGenre(genreId);
      }catch(error) {
        console.log('ジャンルの削除ができませんでした', error);
      }
    },
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
