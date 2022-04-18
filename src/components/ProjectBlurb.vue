<template>
    <div class="col-span-2">
        <div class="grid grid-cols-1 rounded-md  lg:grid-cols-12 p-6 gap-10">
            <div class="flex flex-col lg:col-span-8 lg:p-8  rounded-xl">
                <div class="flex flex-row">
                    <div class="flex flex-row">
                        <router-link :to="{ name:'viewProject', params: {safe_name:project.safe_name}}" class="text-2xl font-bold">
                            {{ project.name }}
                        </router-link>
                        <div v-if="userStore.isLoggedIn">
                            <div>
                                <a href="#" class="ml-2 pt-2" v-on:click="UI.isDropdownHidden = !UI.isDropdownHidden"><i class="bi bi-three-dots"></i></a>
                            </div>
                            <div v-show="!UI.isDropdownHidden" class="absolute w-max h-max bg-slate-50 drop-shadow-xl z-10 p-2 rounded-md grid grid-cols-1" ref="option_dropdown">
                                <RouterLink  :to="{ name: 'editProject', params: {safe_name: project.safe_name } }"  class="p-1">
                                    <i class="bi bi-pencil-square"></i> Edit
                                </RouterLink>
                                
                                <a href="#" @click="deleteProject()" class="p-1"> <i class="bi bi-trash3"> Delete</i> </a>
                            </div>
                        </div>
                    </div>
                    <a target="_blank" v-bind:href="project.projectLink" class="ml-auto text-md"> <i class=" bi bi-github"></i> Github </a>
                </div>

                <hr>

                <MarkdownText class="mt-5" v-bind:texts="project.description" />

                <p class="mb-2 mt-5 font-semibold">Latest Commits</p>
                <hr>
                <div class="grid grid-cols-6">
                    <div class="col-span-2">
                        <p> {{ commit.author }} </p>
                        <p> {{ commit.date }} </p>
                    </div>
                    <p class="col-span-4">
                        {{ commit.message }}
                    </p>
                </div>
            </div>
            <div class="ml-auto lg:col-span-4 w-full h-60 mx-auto pt-8">
                <img v-if="project.banner == ''" class="object-cover w-full h-full bg-center rounded-md shadow-2xl border-2 border-gray-900 "  src="../assets/images/placeholder_small.jpg" alt="">
                <img v-else class="object-cover w-full h-full bg-center rounded-md shadow-2xl border-2 border-gray-900 "  v-bind:src="projectStore.ImageUrl(props.project.banner)" alt="">
                <div class="flex flex-row mt-2 ">
                    <span v-for="tag in project.tags" :key="tag" class="inline-block text-sm bg-slate-800 text-white px-2 mr-1 rounded-md font-sans">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { UseUserStore } from '../stores/userStore';
import { UseProjectStore } from '../stores/projectStore';
import { watch } from 'vue';
import MarkdownText from './MarkdownText.vue'
import { reactive } from 'vue'
import Dropdown from './UI/Dropdown.vue';


const userStore = UseUserStore();
const projectStore = UseProjectStore();

var props = defineProps({
    project: Object
});

var project_image = projectStore.ImageUrl(props.project.banner);

const UI = reactive({
    isDropdownHidden: true
})

const commit = reactive({
    message: "",
    author: "",
    date: "",
})

function update_commit(project_link) {
    // Get latest commits
    commit.message = "";
    commit.author = "";
    commit.date = "";
    var project_link_name = project_link.split("/")[project_link.split("/").length-1];
    var project_link_auth = project_link.split("/")[project_link.split("/").length-2];
    var github_api_link = "https://api.github.com/repos/"+project_link_auth+"/"+project_link_name+"/commits?per_page=1"
    console.log(github_api_link)
    fetch(github_api_link).then(function(response) {
        return response.json()
    }).then((data) => {
        if (data.length > 0) {
            let latest_commit = data[0]
            commit.message = latest_commit.commit.message
            commit.author = latest_commit.commit.author.name
            commit.date =  latest_commit.commit.author.date.split("T")[0]
        }
    })
}

function deleteProject() {
    if (window.confirm("Are you sure you want to delete this project?")) {
        projectStore.deleteProject(projectStore.project.safe_name)
    }
}

defineExpose({
    update_commit: update_commit,
})

</script>

<style>


</style>