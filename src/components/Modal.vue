<template>
  <ModalWindow v-model="showModal">
    <component :is="component" @close-modal="$emit('close-modal')"/>
  </ModalWindow>
</template>

<script>
import GenreBodyComp from './GenreBody.vue'
import TaskBodyComp from './TaskBody.vue'

export default {
  name: 'ModalComp',
  components: {
    GenreBodyComp,
    TaskBodyComp
  },
  data() {
    return {
      showModal: false
    }
  },
  props: {
    body: String
  },
  computed: {
    component: function() {
      return this.body === 'taskBody' ? TaskBodyComp: GenreBodyComp
    }
  }
}
</script>

<style>
.vm {
  height: 75vh;
  padding: 2vw 10vw;
  text-align: center;
}
</style>