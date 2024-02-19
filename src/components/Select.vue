<template>
    <select class="select" v-model="internalValue">
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
    modelValue: null
  },
  // data(){
  //   return {
  //     selectedGenreId: null
  //   };
  // },
  // watch:{
  //   selectedGenreId(newVal) {
  //   this.$emit('update:selectedGenreId', newVal);
  //   }
  // },
  computed: {
    internalValue: {
      get() {
        console.log(this.modelValue)
        return this.modelValue;
      },
      set(newValue) {
        console.log(newValue)
        this.$emit('update:modelValue', newValue); // Vue 3では`input`イベントの代わりに`update:modelValue`を使用
      }
    }
  }
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