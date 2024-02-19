<template>
     <div class="task_list">
       <div class="section">
         <MenuIcon class="section_ele" @click="toggleShowTasks"/>
         <span class="section_ele">{{ status }}</span>
         <div v-if="status === 'ToDo'">
          <AddCircleIcon
            class="add_circle_outline_icon"
            fontSize="small"
            @click="showModal = true"
          />
        </div>
         <ModalComp body="taskBody" v-model="showModal"/>
       </div>
       <div class="task_field" v-if="showTasks">
        <TaskComp 
          v-for="task in tasks"
          :key="task.id"
          :task="task"
        />
       </div>
     </div>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import AddCircleIcon from 'vue-material-design-icons/PlusCircleOutline.vue'
import TaskComp from './Task.vue'
import ModalComp from './Modal.vue'

export default {
  name: 'ToDoListComp',
  components:{
    MenuIcon,
    AddCircleIcon,
    TaskComp,
    ModalComp
  },
  data() {
    return {
      showModal: false,
      showTasks: true
    }
  },
  props: {
    tasks: {
      type: Array, //Array型のtasksを取得
      default:() => []  //デフォルト値には[]を設定
    },
    status: String
  },
  methods: {
    toggleShowTasks() {
      // メニューアイコンの表示・非表示切り替え
      this.showTasks = !this.showTasks;
    }
  }
}
</script>

<style scoped>
  .task_list {
    min-width: 300px;
    width: auto;
    padding: 30px;
    padding-top: 50px;
  }

  .section {
    display: flex;
    position: relative;
    align-items: center;
    height: 50px;
    width: 300px;
    background-color: white;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  .section_ele {
    color: rgb(70, 70, 70);
    margin-left: 10px;
    font-size: 18px;
  }

  .task_field {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 65vh;
    margin-top: 10px;
    overflow: auto;
  }

  .task_field::-webkit-scrollbar {
    display:none;
  }

  .section > .add_circle_outline_icon {
    position: absolute;
    right: 10px;
    font-size: 25px;
    color: rgb(70, 70, 70);
  }
</style>