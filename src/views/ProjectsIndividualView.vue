<script setup>
import { useRouter, useRoute } from 'vue-router'
import { UseUserStore } from '../stores/userStore';
import ProjectBlurb from '../components/ProjectBlurb.vue';
import { onMounted, reactive, ref } from 'vue';
import PostCard from '../components/PostCard.vue';
import { UseProjectStore } from '../stores/projectStore';

const userStore = UseUserStore()
const projectStore = UseProjectStore()

const route = useRoute();
const theBlurb = ref(null)

const project = route.params.project

const posts = reactive({
    posts: [],
    isLoading: true,
    isError: false,
    errorMessage: ''
})

onMounted(() => {
    console.log(project)
    theBlurb.value.update_commit(project.projectLink)
    let response = projectStore.getPostsByProject(project.safe_name).then( (newPosts) => {
        posts.posts = newPosts.data
        console.log(posts)  
    })
})

</script>

<template>
<div class="lg:px-20 2xl:px-64 py-5 bg-white">
    <ProjectBlurb :project="project" ref="theBlurb"/>
</div>

<div class="container mx-auto xl:px-36">
    <div class="flex flex-row mt-10">
        <div class="basis-1/4 pt-20">
            <!-- Date filter -->
            <p class="font-semibold text-lg ml-5">
                Date
            </p>
            <!-- Display a list -->
            <ul class="list-disc ml-10">
                <li class="mt-2">
                January
                </li>
                <li class="mt-2">
                Febuary
                </li>
                <li class="mt-2">
                March
                </li>
                <li class="mt-2">
                April
                </li>
                <li class="mt-2">
                May
                </li>
                <li class="mt-2">
                June
                </li>
                <li class="mt-2">
                July
                </li>
                <li class="mt-2">
                August
                </li>
                <li class="mt-2">
                September
                </li>
                <li class="mt-2">
                October
                </li>
                <li class="mt-2">
                November
                </li>
                <li class="mt-2">
                December
                </li>

            </ul>
        </div>
        <!-- Update posts -->
        <div class="flex flex-col gap-10 basis-3/4">
            <RouterLink v-if="userStore.isLoggedIn" :to="{name:'addPost', params: {safe_name: project.safe_name}}" class="text-center w-full rounded-sm text-white font-semibold bg-slate-500 py-4" > Create Post</RouterLink>            
            <!-- Display posts -->
            <PostCard v-for="post in posts.posts.slice().reverse()" :key="post" :post="post" />
            <p class="text-slate-400 text-center">End of page!</p>
            <hr class="mb-20">
        </div>
    </div>
</div>

</template>

<style>

</style>