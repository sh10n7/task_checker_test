<template>
  <div className="modal_body">
      <ul>
        <li class="genre_title">
          <span>ジャンルの名前</span>
          <CancelIcon />
        </li>
      </ul>
      <form>
        <input type="text" v-model="genre.name"/>
        <input class="input_submit" type="button" value="追加" @click="submit"/>
      </form>
  </div>
</template>
<script>
import axios from 'axios';
import CancelIcon from 'vue-material-design-icons/CloseCircle.vue'

export default {
  name: 'GenreBodyComp',
  components: {
    CancelIcon
  },
  data(){
    return{
      genre: {
        name: ''
      }
    }
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post('http://localhost:5000/genres', this.genre)
        console.log(response.data)
        // 成功した場合、トップページ（例: '/'）へリダイレクト
        // this.$router.push('/');
      } catch (error) {
        console.log("保存ができませんでした", error);
      }
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
