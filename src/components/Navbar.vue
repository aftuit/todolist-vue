<template>
    <div class="mx-auto py-3 shadow-md">
        <div class="flex justify-between container mx-auto">
            <h2 class="text-3xl font-bold">ToDo</h2>
            <button @click="open" class="bg-slate-950 text-slate-200 p-2 rounded-md hover:bg-slate-800"> + Create New</button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        open() {
            window.open(window.location.href, '_blank', 'noopener=true')
        }
    }
}
</script>
<style>
    
</style>