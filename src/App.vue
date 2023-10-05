
<template>
  <header>
    <div class="wrapper mx-auto">
      <Navbar />
      <Title v-if="!isCreated" :editTitle="editTitle"/>
      <TodosPage v-else :addTask="addTask"/>
    </div>
  </header>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Title from "./components/Title.vue";
import TodosPage from "./components/TodosPage.vue";
import { useListStore } from "./stores/listStore";
import { mapState, mapStores, storeToRefs, mapActions } from "pinia";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Navbar,
    Title,
    TodosPage
  },
  computed: {
    ...mapStores(useListStore),
    ...mapState(useListStore, ['title', 'isCreated']),
  },
  methods: {
    ...mapActions(useListStore, ['addTask', 'editTitle']),
    
  },
})
</script>


<style></style>

