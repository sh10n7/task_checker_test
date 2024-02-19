
<template>
    <HeaderComp />
    <div class="genre">
      <SelectComp :genres="genreStore.genres" @change="changeSelectedGenreId"/>
      <AddCircleIcon class="add_circle_outline_icon" fontSize="medium" @click="showModal = true"/>
      <ModalComp body="genreBody" v-model="showModal"/>
    </div>
    <ToDoListComp :tasks="taskStore.filteredTasks" />
</template>

<script>
import HeaderComp from '../components/Header.vue'
import SelectComp from '../components/Select.vue'
import ToDoListComp from '../components/ToDoList.vue'
import AddCircleIcon from 'vue-material-design-icons/PlusCircleOutline.vue'
import ModalComp from '../components/Modal.vue'
import { useGenreStore } from '../stores/genreStore'
import { useTaskStore } from '../stores/taskStore'

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
      showModal: false,
      genreStore: useGenreStore(),
      taskStore: useTaskStore(),
    }
  },
  methods: {
    changeSelectedGenreId(e) {
      // 選択したデータの番号を数値化する
      const selectedGenreId = Number(e.target.value);
      const taskStore = useTaskStore();
      taskStore.filterTasks(selectedGenreId);
    }
  },
  async mounted() {
    // マウントされた時にgenreデータとtaskデータを取得する。
    await this.genreStore.fetchAllGenres();
    await this.taskStore.fetchAllTasks();
  },
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