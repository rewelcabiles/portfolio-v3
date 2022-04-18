<script setup>
import MarkdownText from '../components/MarkdownText.vue';
import { useRoute, useRouter } from 'vue-router';
import { reactive } from 'vue';
import { UseUserStore } from '../stores/userStore';
import { UseProjectStore } from '../stores/projectStore';
import PostCard from '../components/PostCard.vue';

const userStore = UseUserStore();
const projectStore = UseProjectStore();

const route = useRoute()
const router = useRouter()

const state = reactive({
    isEditMode: false,
    errors: [],
    hasError: false
})

const post = reactive({
    title: "",
    content: "",
    author: userStore.username,
});

const project_name = route.params.project_name
const safe_name = route.params.safe_name

function submitPost(){
    projectStore.createPost(post, safe_name).then( (response) => {
        console.log(response)
        if(response.status == 201){
            router.push('/projects/' + safe_name)
        } else {
            state.hasError = true;
            state.errors = response.data;
        }
    })
}

</script>

<template>
  <div class="container mx-auto mt-20 mb-20">
    <div class="flex flex-row">
        <div class="w-full">
            <h1 class="text-2xl font-bold mb-10">
                New post for: {{ project_name }}
            </h1>
            <!-- Error messages here -->
            
            <form v-on:submit.prevent="submitPost">
                <div class="flex flex-row gap-20">
                    <div class="w-1/2 flex flex-col gap-5">
                        <p class="font-semibold text-xl mb-5"> New Post</p>
                        <div v-for="error in state.errors" :key="error" class="bg-red-500 text-white text-center p-2 mb-4 rounded-sm">
                            {{ state.errors.message }}
                        </div>
                        <div>
                            <label for="title">Title</label>
                            <input type="text" class="w-full p-2 border border-gray-500 rounded-md" v-model="post.title">
                        </div>
                        <div>
                            <label for="content">Content</label>
                            <textarea name="content" id="content" cols="30" rows="10" class="w-full p-2 border border-gray-500 rounded-md" v-model="post.content"></textarea>
                        </div>
                        <div>
                            <button class="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" data-bcup-haslogintext="no" id="submit">
                                Add
                            </button>

                            
                        </div>
                    </div>
                    <!-- Show post preview -->
                    <div class="w-1/2">
                        <p class="font-semibold text-xl mb-5">Preview</p>
                        <PostCard :post="post" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>


<style>

</style>