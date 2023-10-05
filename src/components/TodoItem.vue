<template>
  <li class="py-1 my-1 px-2 flex items-center mt-4 w-full">
    <input
      @change="completeTask(item.id)"
      type="checkbox"
      class="h-[15px] w-[15px] m-0"
      :checked="item.isCompleted"
      v-if="!item.isEditing"
    />
    <input
      type="text"
      ref="label"
      placeholder="task label..."
      name="label"
      class="outline-none rounded-sm py-2 px-3 ms-2 border w-full"
      :class="`${item.isEditing && 'border border-slate-600'} ${
        item.isCompleted && 'italic text-slate-400 line-through'
      }`"
      :value="item.label ?? label"
      @input="change"
      :disabled="!item.isEditing"
    />
    <div class="ms-auto flex" v-if="item.isEditing">
      <i
        @click="save"
        class="fa-solid fa-check edit cursor-pointer text-green-400 hover:text-green-500 px-2 py-1"
      ></i>
      <i
        @click="cancel"
        class="fa-solid fa-xmark edit cursor-pointer text-red-300 hover:text-red-800 px-2 py-1"
      ></i>
    </div>
    <div class="ms-auto flex" v-else>
      <i
        @click="edit"
        class="fa-regular fa-pen-to-square edit cursor-pointer text-slate-300 hover:text-slate-800 px-2 py-1"
      ></i>
      <i
        @click="deleteItem"
        class="fa-solid fa-trash-can edit cursor-pointer text-red-300 hover:text-red-800 px-2 py-1"
      ></i>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    saveTask: {
      type: Function,
      required: true,
    },
    deleteTask: {
      type: Function,
      required: true,
    },
    completeTask: {
      type: Function,
      required: true,
    },
    editItem: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      label: this.item?.label || "",
    };
  },
  methods: {
    change(evt) {
      this.label = evt.target.value;
    },
    save() {
      if (this.label) {
        this.saveTask(this.item, this.label);
        this.label = "";
      } else {
        alert("Fill the blank!");
      }
    },
    cancel() {
      if(this.item.label){
        this.editItem(this.item.id);
        return;
      } this.deleteTask(this.item.id);
      this.label = "";
    },
    deleteItem() {
      this.deleteTask(this.item.id);
      this.label = "";
    },
    edit() {
      this.editItem(this.item.id);
      setTimeout(() => {
        this.focus();
      }, 5);
    },
    focus() {
      if (this.item.isEditing) {
        this.$refs.label.focus();
      }
    },
  },
  mounted() {
    this.focus();
  },
};
</script>
<style scoped>
.edit {
  transition: all 0.1s linear;
}
</style>