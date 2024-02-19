
<template>
    <HeaderComp />
    <div class="genre">
      <SelectComp :genres="genres"/>
      <AddCircleIcon class="add_circle_outline_icon" fontSize="medium" @click="showModal = true"/>
      <ModalComp body="genreBody" v-model="showModal"/>
    </div>
    <ToDoListComp :tasks="tasks"/>
</template>

<script>
import HeaderComp from '../components/Header.vue'
import SelectComp from '../components/Select.vue'
import ToDoListComp from '../components/ToDoList.vue'
import AddCircleIcon from 'vue-material-design-icons/PlusCircleOutline.vue'
import ModalComp from '../components/Modal.vue'
import axios from 'axios';

export default {
  name: 'HomePage',
  components: {
    HeaderComp,
    SelectComp,
    ToDoListComp,
    AddCircleIcon,
    ModalComp
  },
  data() {
    return {
      genres: [],
      tasks: [],
      showModal: false
    }
  },
  async mounted() {
    await this.fetchGenres();
    await this.fetchTasks();
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await axios.get('http://localhost:5000/genres');
        this.genres = response.data;
      } catch (error) {
        console.error('ジャンルデータの取得ができませんでした。', error);
      }
    },
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('タスクデータの取得ができませんでした。', error);
      }
    }
  }
}
</script>

<style>
  .genre {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding-top: 20px;
  }
  
  .add_circle_outline_icon {
    margin-left: 10px;
    color: rgb(70, 70, 70);
  }
</style>