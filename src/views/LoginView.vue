<script setup>
import { reactive } from '@vue/reactivity'

import router from '../router';
import { UseUserStore } from '@/stores/userStore'

const userStore = UseUserStore()

const state = reactive({
    username: null,
    password: null,
    error:false,
    errorMessage: "",
})

async function submitClicked() {
    // Use Axios to send a login request to the API server
    await userStore.login({ username: state.username, password: state.password})
    .then(response => {
        console.log("??")
        if (response == "success"){
            router.push('/')
        } else {
            state.error = true;
            state.errorMessage = "Invalid username or password"
        }
    });
}

</script>

<template>
    <div class="container mx-auto ">
        <div class="flex justify-center items-center mx-auto mt-20 p-10 ">
            <div class="flex flex-col gap-11 shadow-lg p-10 rounded-lg">
                <!--Show error message if error is true-->
                
                <h1 class="text-3xl"> LOGIN</h1>
                <div v-if="state.error" class="bg-red-600  p-2 rounded-md text-slate-50 ">
                    {{ state.errorMessage }}
                </div>
                
                <div>
                    <label for="username" class="text-lg"> Username </label>
                    <input type="text" v-model="state.username" class="w-full p-2 border-2 border-gray-500">
                </div>
                <div>
                    <label for="password" class="text-lg">Password</label>
                <input type="password" v-model="state.password" class="w-full p-2 border-2 border-gray-500">
                </div>
                <button type="submit" @click="submitClicked()" class="w-full p-2 border-2 border-gray-500"> Login</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>