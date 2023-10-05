<template>
  <div class="todos-wrapper container shadow-xl mx-auto h-[80vh] mt-10 px-4 py-5">
    <p class="mb-0 text-sm text-slate-400">Project name</p>
    <div class="todo-label w-fit">
      <input
        type="text"
        ref="title"
        @input="inputHandler"
        class="w-3/4 rounded-md py-1 px-3 outline-none text-3xl font-semibold bg-transparent"
        :value="titleValue"
        :class="edit && 'border border-slate-400 rounded-sm'"
        :disabled="!edit"
      />
      <div class="inline-block ms-1" v-if="!edit">
        <i
          title="Edit title"
          @click="startEdit"
          class="fa-solid fa-file-pen edit text-slate-400 hover:text-slate-700 cursor-pointer"
        ></i>
      </div>
      <div class="inline-block ms-3" v-else>
        <i
          title="Save title"
          @click="saveTitle"
          class="fa-solid fa-check edit cursor-pointer text-green-400 hover:text-green-500 px-2 py-1 text-xl"
        ></i>
        <i
          title="Cancel"
          @click="cancelTitle"
          class="fa-solid fa-xmark edit cursor-pointer text-red-300 hover:text-red-800 px-2 py-1 text-xl"
        ></i>
      </div>
    </div>

    <Filter :filterHandler="filterHandler" />

    <h3
      class="italic text-slate-500 font-semibold text-xl w-full text-center mt-5"
      v-if="!items.length || !filteredTasks(items, filter).length"
    >
      No Tasks
    </h3>

    <div class="todos-list mx-auto w-fit mt-3">
      <ul class="max-h-[280px] overflow-y-auto shadow-inner list-content">
        <TodoItem
          v-for="item in filteredTasks(items, filter)"
          :key="item.id"
          :item="item"
          :saveTask="saveTask"
          :completeTask="completeTask"
          :deleteTask="deleteTask"
          :editItem="editItem"
          :filter="filter"
        />
      </ul>
      <button
        @click="addTask"
        class="py-1 px-2 text-green-500 bg-green-100 rounded-md font-montserrat hover:bg-green-200 font-semibold mt-3 hover:text-green-700 transition-transform mx-auto w-[350px] border border-green-500 shadow-green-600 "
      >
        + Add Task
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapStores } from "pinia";
import { defineComponent } from "vue";
import { useListStore } from "../stores/listStore";
import TodoItem from "./TodoItem.vue";
import Filter from "./Filter.vue";
export default defineComponent({
  components: { TodoItem, Filter },
  computed: {
    ...mapStores(useListStore),
    ...mapState(useListStore, ["items", "title", "filter"]),
  },
  data() {
    return {
      titleValue: window.sessionStorage.getItem("title"),
      edit: false,
    };
  },
  methods: {
    ...mapActions(useListStore, [
      "addTask",
      "saveTask",
      "deleteTask",
      "completeTask",
      "editTitle",
      "filterHandler",
      "editItem",
    ]),
    startEdit() {
      this.edit = true;
      setTimeout(() => {
        this.$refs.title.focus();
      }, 5);
    },
    inputHandler(evt) {
      this.titleValue = evt.target.value;
    },
    saveTitle() {
      this.editTitle(this.titleValue);
      this.edit = false;
    },
    cancelTitle() {
      this.titleValue = this.title;
      this.edit = false;
    },
    filteredTasks(items, filter) {
      let list = items.filter((item) =>
        item.label?.toLowerCase().includes(filter.search.toLowerCase())
      );

      if (filter.show === "all") {
        return list;
      } else if (filter.show === "completed") {
        return list.filter((li) => li.isCompleted);
      } else {
        return list.filter((li) => !li.isCompleted);
      }
    },
  },
});
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 4px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(161, 160, 160); 
  border-radius: 10px;
}

</style>