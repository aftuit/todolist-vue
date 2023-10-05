<template>
  <div
    class="filter-wrap flex align-center mx-auto w-full justify-center px-3 py-4 mt-3"
  >
    <input
      type="search"
      name="search"
      :defaultValue="search"
      @input="inputHandler"
      placeholder="Search task..."
      class="w-3/4 border border-slate-400 outline-none rounded-lg py-2 px-3"
    />
    <select
      @input="selectHandler"
      name="show"
      :value="show"
      class="border border-slate-400 rounded-md py-1 px-2 outline-none ms-2"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="uncompleted">Uncompleted</option>
    </select>
  </div>
</template>
<script>
export default {
  props: {
    filterHandler: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      search: JSON.parse(window.sessionStorage.getItem("filter"))?.search || "",
      show: JSON.parse(window.sessionStorage.getItem("filter"))?.show || "all",
    }
  },
  methods: {
    inputHandler(evt) {
      this.filterHandler("search", evt.target.value);
    },
    selectHandler(evt) {
      this.filterHandler("show", evt.target.value);
    },
  },
};
</script>
<style>
</style>