<template lang="">
    <form @submit="createTitle" class="p-5 shadow-2xl m-3 w-1/2 mx-auto flex flex-col mt-20">
        <h2 class="text-3xl font-medium font-montserrat">Project title</h2>
        <input 
            type="text" 
            placeholder="Enter title" 
            required
            @input="inputHandler"
            :value="title" 
            class="mt-4 w-full border border-slate-400 outline-none rounded-lg py-2 px-3">
        <button @click="this.edit = true" class="border-spacing-3 transition-all p-4 border py-2 px-3 rounded-md bg-slate-600 hover:bg-slate-800 active:bg-slate-900 text-yellow-50 mt-3" type="submit">Create</button>
    </form>
</template>
<script>
export default {
  props: {
    editTitle: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      title: "",
      edit: false,
    };
  },
  methods: {
    inputHandler(evt){
        this.title = evt.target.value;
    },
    createTitle(evt) {
      evt.preventDefault();
      this.editTitle(this.title);
      this.title = "";
    },
  },
};
</script>
<style lang="">
</style>