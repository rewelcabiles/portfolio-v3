import { defineStore } from 'pinia'
import { useStorage, useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'
import axios from 'axios'

export const UseUserStore = defineStore('userStore',{
  state: () => ({ 
    user: ref(useLocalStorage('user', null)),
    access_token: ref(useLocalStorage('access_token', null)),
    test: "hi"
  }),
  getters: {
    isLoggedIn: state => !!state.user,
    username: state => state.user ? state.getUser.username : 'No Username',
    getUser: state => JSON.parse(state.user),
  },
  actions: {

    logout(){
      this.user = null
      this.access_token = null
      this.test = "bye"
    },

    async login(user) {
      let state = this
      return await axios.post(import.meta.env.VITE_BASE_API_URL + '/auth/login', user).then(function (response) {
        if (response.data.access_token) {
          console.log("Access Token Found!")
          state.user = JSON.stringify(response.data.user)
          state.access_token = response.data.access_token
          return "success"
        } else {
          console.log("Login Invalid!")
          return "fail"
        }
      }).catch( function (error) {
        console.log("Login Error!")
        console.log(error)
        return "fail"
      })
    }
  },
});

