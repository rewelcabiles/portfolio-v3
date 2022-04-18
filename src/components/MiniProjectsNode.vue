<script setup>

const props = defineProps({
    project: { type: Object, required: true }
});

const emit = defineEmits(['cardClicked'])
var media_base_link = import.meta.env.VITE_BASE_MEDIA_URL

</script>

<template>
    <div class="rounded-xl drop-shadow-lg shadow-lg h-36 w-full relative flex transition ease-linear border-2">
        <div class="rounded-xl absolute bg-cover bg-center w-full h-full z-0 " v-bind:style="{ 'background-image': 'url(' + media_base_link + project.banner + ')' }"></div>
        <a href="#" @click="$emit('cardClicked', project.safe_name)" class="w-full h-full absolute">
            <div class="w-full h-full rounded-xl opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-70 p-5  ease-linear transition z-10 absolute text-white text-lg font-bold ">
                {{ project.name }}
            </div>
        </a>
    </div>
</template>

<style scoped>

</style>
