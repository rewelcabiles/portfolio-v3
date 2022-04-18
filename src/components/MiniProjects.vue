<script setup>
import { faker } from '@faker-js/faker';
import { useRouter, useRoute } from 'vue-router'
import { UseProjectStore } from '@/stores/projectStore'

import MiniProjectsNode from './MiniProjectsNode.vue';

// Generate fake projects with a random name and description

const router = useRouter()
const projectStore = UseProjectStore()

var projects = projectStore.projects;

function goToProjectPage(safe_name) {
    console.log(safe_name)
    router.push('/projects/view/' + safe_name);
}
</script>

<template>
    <div class="container mx-auto mt-10  pt-10 px-10 lg:h-vh90">
        <div class="container mx-auto">
            <div class="justify-center items-center mx-auto hidden xl:flex"> 
                <a href="#home" class="transition ease-linear hover:scale-125 text-gray-600 text-2xl">
                    &#8593; 
                </a>
            </div>
        </div>
        <div class="flex flex-row mt-3">
            <p class="lg:pr-20 text-5xl min-w-max font-extralight md:tracking-wide mx-auto">&#128421; projects </p>
            <hr class="my-auto z-0 w-full border-black hidden lg:block">
        </div>
        <div class="flex flex-col xl:flex-row mt-24 gap-10  pb-40">
            <div class="lg:basis-1/3 lg:pr-5  ">
                <p class="text-justify font-medium md:text-xl mb-3 ">
                    Hey! Here are just a few of the projects I've worked on for school or for fun! To see more projects, click the link below!
                </p>
                <RouterLink to="/projects">
                    <div class="w-full p-4 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition ease-in-out ">
                        <p class="w-full text-center text-white font-bold">
                            View All Projects
                        </p>
                    </div>
                </RouterLink>
                
            </div>
            <div class="lg:basis-2/3 p-4 clouds rounded-2xl drop-shadow-lg">
                <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    <MiniProjectsNode @cardClicked="goToProjectPage" v-for="project in projects"  :key="project.name" v-bind:project=project />
                </div>
            </div>
        </div>
    </div>
     <div class="h-vh10">
        <div class=" justify-center items-center mx-auto hidden xl:flex"> 
            <a href="#contact_me" class="transition ease-linear hover:scale-125 text-gray-600 text-2xl">
                &#8595;
            </a>
        </div>
    </div>
</template>

<style scoped>

</style>
