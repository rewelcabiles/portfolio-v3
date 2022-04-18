<template>
<div>
    <div>
        <i class="bi bi-three-dots"></i>
    </div>
    <div class="w-fit">
        <a href="#" v-for="item in items" :key="item">{{ item }}</a>
    </div>
</div>
</template>

<script setup>

const props = defineProps( {
    name: String,
    items: Array
})

</script>

<style>

</style>