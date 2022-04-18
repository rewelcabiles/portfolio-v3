<script setup>
import axios from 'axios'
import { UseProjectStore } from '@/stores/projectStore'
import { UseUserStore } from '@/stores/userStore'
import MiniProjectsNode from '../components/MiniProjectsNode.vue';
import ProjectBlurb from '../components/ProjectBlurb.vue';
import MiniProjectsNodeSkeleton from '../components/MiniProjectsNodeSkeleton.vue';
import { ref } from 'vue';

const projectStore = UseProjectStore()
const userStore = UseUserStore()

projectStore.getAllProjects().then(function() {
    projectStore.setSelectedProject(projectStore.projects[0].safe_name)
    theBlurb.value.update_commit(projectStore.project.projectLink)
});


function tagClicked(tag_name){
    projectStore.selectedTag = tag_name
}


const theBlurb = ref(null)

function cardClicked(safe_name){
    projectStore.setSelectedProject(safe_name)
    theBlurb.value.update_commit(projectStore.project.projectLink)
}

</script>

<template>
  <div class="flex flex-row overflow-hidden h-screen w-screen ">
        <div class="w-full px-2 md:px-10 2xl:px-20 overflow-y-scroll scroll-smooth">
            <div>
                <div class="flex flex-row pt-24 xl:mb-14 " id="tags">
                    <hr class="my-auto z-0 w-full border-black hidden md:block">
                    <p class="lg:px-20 text-3xl lg:text-5xl min-w-max font-extralight md:tracking-wide mx-auto">things I've made </p>
                    <hr class="my-auto z-0 w-full border-black hidden md:block">
                </div>
                <div class="grid grid-rows-1 xl:grid-cols-3 2xl:gap-10">
                    <div class="p-6">
                        <p class="text-lg mb-4 ">Tags</p>
                        <div class="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 col-span-2 drop-shadow-md" v-if="projectStore.loadingProjects == false">
                            <button class="rounded-sm border-2 border-slate-900 p-1 hover:text-white hover:bg-slate-800 bg-slate-50 text-black transition ease-in" @click="tagClicked('All')">
                                All
                            </button>
                            <button @click="tagClicked(tag)" v-for="tag in projectStore.allTags" :key="tag" class="h-10 rounded-sm border-2 border-slate-900 text-xs font-bold hover:text-black hover:bg-slate-50   bg-slate-800 text-white transition ease-in" onclick="tagClicked('<%= tag %>')">
                                {{ tag }}
                            </button>
                        </div>
                        <div v-else class="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 col-span-2 drop-shadow-md">
                            <div  v-for="index in 4" :key="index" class="h-10 animate-pulse rounded-sm border-1 text-sm skeleton-bg text-gray text-center">
                                
                            </div>
                        </div>
                        
                        <div class="container flex text-sm font-mono my-5">
                            <p class="" id="tag_show">Showing {{ projectStore.selectedTag }}</p>
                            <a class="ml-auto text-md" href="alternative"> Alternative Page</a>
                        </div>
                        <!-- Check if user -->
                        <div v-if="userStore.isLoggedIn" class="mb-10 flex">
                            <router-link 
                                :to="{ name: 'addProject' }"
                                class="text-center w-full rounded-sm bg-slate-700 py-2 font-bold hover:bg-slate-800 transition ease-linear text-white" replace>
                                Add a new project
                            </router-link>
                        </div>
                        <div class="grid grid-rows-3 lg:grid-cols-2 gap-3" v-if="projectStore.loadingProjects == false">
                            <MiniProjectsNode v-show="project.tags.includes(projectStore.selectedTag) || projectStore.selectedTag == 'All'" @cardClicked="cardClicked" v-for="project in projectStore.projects" :key="project.safe_name" :project="project" />
                        </div>
                        <div class="grid grid-rows-3 lg:grid-cols-2 gap-3 animate-pulse" v-else>
                            <MiniProjectsNodeSkeleton v-for="index in 4" :key="index" />
                        </div>
                        
                    </div>
                    <div class="xl:col-span-2">
                        <ProjectBlurb v-if="projectStore.loadingProjects == false" :project="projectStore.project" ref="theBlurb" />
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style>

</style>
