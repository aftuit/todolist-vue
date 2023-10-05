import { defineStore } from "pinia";

export const useListStore = defineStore("listStore", {
  state: () => ({
    title: window.sessionStorage.getItem("title") || "",
    editingTitle: false,
    isCreated: Boolean(window.sessionStorage.getItem("title")),
    items: JSON.parse(window.sessionStorage.getItem("items")) || [],
    filter: JSON.parse(window.sessionStorage.getItem("filter")) || {
      search: "",
      show: "all",
    },
  }),

  actions: {
    editTitle(newLabel) {
      this.title = newLabel;
      this.isCreated = true;
      this.setStorage("title", this.title);
    },
    addTask() {
      if (this.filter.show === "completed") {
        alert("You can't add task in 'completed' category !!!");
        return;
      }
      this.filterHandler("search", "");
      this.items.push({
        id: new Date().getTime(),
        label: "",
        isCompleted: false,
        isEditing: true,
      });
      this.setStorage("items", JSON.stringify(this.items));
    },
    deleteTask(id) {
      this.items = this.items.filter((it) => it.id !== id);
      this.setStorage("items", JSON.stringify(this.items));
    },
    saveTask(item, value) {
      this.items.map((it) => {
        if (item.id === it.id) {
          it.isEditing = false;
          it.label = value;
        }
      });
      this.setStorage("items", JSON.stringify(this.items));
    },
    editItem(id) {
      this.items.map((it) => {
        if (it.id === id) {
          it.isEditing = !it.isEditing;
        }
      });
      this.setStorage("items", JSON.stringify(this.items));
    },
    completeTask(id) {
      this.items.map((it) => {
        if (it.id === id) {
          it.isCompleted = !it.isCompleted;
        }
      });
      this.setStorage("items", JSON.stringify(this.items));
    },
    filterHandler(key, value) {
      this.filter[key] = value;
      this.setStorage("filter", JSON.stringify(this.filter));
    },
    setStorage(key, value) {
      window.sessionStorage.setItem(key, value);
    },
    getStorage(key) {
      window.sessionStorage.getItem(key);
    },
  },
});
