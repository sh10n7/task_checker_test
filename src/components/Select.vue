<template>
    <select class="select">
      <option v-for="genre in genres" :key="genre._id" :value="genre._id">
        {{genre.name}}
      </option>
    </select>
</template>

<script>
export default {
  name: 'SelectComp',
  props: {
    genres: Array,
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