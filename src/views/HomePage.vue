
<template>
    <HeaderComp />
    <div class="genre">
      <SelectComp :genres="genreStore.genres" @change="changeSelectedGenreId"/>
      <AddCircleIcon class="add_circle_outline_icon" fontSize="medium" @click="showModal = true"/>
      <ModalComp body="genreBody" v-model="showModal"/>
    </div>
    <div class="contents">
      <div  v-for="(status, index) in tasksStatusElements" :key="index">
        <ToDoListComp :tasks="filterTasksByStatus(status)" :status="status" />
      </div>
    </div>
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
      tasksStatusElements: [
        "ToDo",
        "Pending",
        "Doing(ToDay)",
        "WIP",
        "Check",
        "Done",
      ],
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
    },
    filterTasksByStatus(status) {
      //statusで受け取った値がtaskStatusの配列の何番目の数値か調べる。
      const index = this.tasksStatusElements.indexOf(status)
      //indexとtask.statusの値が同じ場合のみデータ取得する。
      return this.taskStore.filteredTasks.filter(task => task.status == index);
    },
  },
  async mounted() {
    // マウントされた時にgenreデータとtaskデータを取得する。
    await this.genreStore.fetchAllGenres();
    await this.taskStore.fetchAllTasks();
  },
}
</script>

<style>
  .contents {
    display: flex;
    height: calc(100vh - 120px);
    width: 100%;
    overflow: auto;
  }

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