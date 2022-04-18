<template>
  <div class="h-full bg-white shadow-md rounded-md drop-shadow-md border-2 hover:border-slate-500 transition ease-in-out p-10">
    <p class="font-medium text-4xl pb-5">{{ post.title }}</p>
    <hr>
    <div class="flex flex-row gap-2 py-3">
        <img src="../assets/images/me.JPG" class="rounded-full w-10 h-10" alt="">
        <div class="ml-1">
            <p class="font-semibold">{{ post.author }}</p>
            <p class="font-light">Date: {{ post.creationDate }}</p>
        </div>
    </div>
    <hr class="pb-5">
    <MarkdownText :texts="post.content" />
</div>
</template>

<script setup>
import MarkdownText from '../components/MarkdownText.vue';


const props = defineProps({
    post: {
        type: Object,
        required: true,
    },
});

</script>

<style>

</style>