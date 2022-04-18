<template>
<div>
    <!--Create a Center div-->
    <div class="container mx-auto pt-20 mt-10 mb-20">
        <div class="lg:w-1/2   mx-auto rounded-2xl shadow-xl bg-gray-white p-10">  <!--Create a Flex Container-->
            <div v-for="error in state.errors" :key="error" class="bg-red-500 text-white text-center p-2 mb-4 rounded-sm">
                {{ state.errors.message }}
            </div>

            <h1 v-if="state.isEditMode" class="text-2xl font-bold mb-2">Edit Project</h1>
            <h1 v-else class="text-2xl font-bold mb-2">Add Project</h1>
            
            <div class="flex flex-col">
                <div class="mb-10">
                    <label for="project_name" class="text-md block">Project Name</label>
                    <input type="text" name="project_name" id="project_name" class="w-full p-2 border-2 border-gray-500" v-model="project.name">
                </div>
                <div class="mb-10">
                    <label for="project_description" class="text-md block">Project Description</label>
                    <textarea name="project_description" id="project_description" class="w-full p-2 border-2 border-gray-500" rows="5" v-model="project.description"></textarea>
                </div>
                <div class="mb-10">
                    <label for="project_link" class="text-md block">Project Link</label>
                    <input type="text" name="project_link" id="project_link" class="w-full p-2 border-2 border-gray-500" v-model="project.projectLink">
                </div>

                <div class="mb-10">
                    <label for="project_image" class="text-md block">Project Image</label>
                    <input type="file" name="project_image" class="p-1  w-full border-2 border-gray-700" accept="image/*" @change="handleFileUpload( $event )" >
                </div>
                <div class="mb-10">
                    <label for="project_tags" class="text-md block is_markdown">Tags</label>
                    <input type="text" name="project_tags" id="project_tags" class="w-full p-2 border-2 border-gray-500" v-model="project.tags">
                </div>
                <button v-if="state.isEditMode" @click="updateProject(project)" class="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                        Update
                </button> 
                <button v-else @click="addProject(project)" class="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                        Add
                </button> 
            </div>
        </div>
    </div>
</div>

</template>

<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { UseProjectStore } from '../stores/projectStore';


const projectStore = UseProjectStore()
const route = useRoute()
const router = useRouter()
const imageInput = ref(null)

const state = reactive({
    isEditMode: false,
    errors: [],
    hasError: false
})

const project = reactive({
    name: '',
    description: '',
    projectLink: '',
    tags: [],
    banner: '',
    safe_name: ''
})

var file = ''

onBeforeMount(() => {
    if ("safe_name" in route.params) {
        state.isEditMode = true;
        projectStore.getProjectBySafeName(route.params.safe_name).then( (newProject) => {
            project.safe_name = route.params.safe_name;
            project.banner = newProject.banner;
            project.name = newProject.name;
            project.description = newProject.description;
            project.projectLink = newProject.projectLink;
            project.tags = newProject.tags;
        });
    } else {
        state.isEditMode = false;
        project.safe_name = '';
        project.banner = '';
        project.name = '';
        project.description = '';
        project.projectLink = '';
        project.tags = '';

    }
})

function handleFileUpload( event ) {
    file = event.target.files[0];
    project.banner = file;
}

function updateProject() {
    projectStore.updateProject(project).then( (response) => {
        console.log(response)
        if(response.status == 200){
            router.push('/projects')
        } else {
            state.hasError = true;
            state.errors = response.data;
        }
    });
}

function addProject(){
    projectStore.addProject(project).then( (response) => {
        
        if(response.status == 201){
            router.push('/projects')
        } else {
            state.hasError = true;
            state.errors = response.data;
        }
    });
}

</script>
