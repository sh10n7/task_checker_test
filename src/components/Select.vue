<template>
    <select v-if="genres" class="select" :value="initialValue">
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{genre.name}}
      </option>
    </select>

    <select v-else-if="taskStatus" class="select" :value="initialValue">
      <option v-for="(status, index) in taskStatus" :key="index" :value="index">
        {{ status }}
      </option>
    </select>
</template>

<script>

export default {
  name: 'SelectComp',
  props: {
    genres: Array,
    taskStatus: Array,
    initialValue: String
  },
}


</script>

<style scoped>
  .select {
  width: 150px;
  height: 25px;
  font-size: 15px;
  color: rgb(70, 70, 70);
  border: none;
  border-bottom: thin solid #cfcfcf;
  outline: none;
  cursor: pointer;
}
</style>