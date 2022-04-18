import { defineStore } from 'pinia'
import { faker } from '@faker-js/faker';
import axios from 'axios'

export const UseProjectStore = defineStore('projectStore',{
  state: () => ({ 
    projects: [],
    loadingProjects: true,
    selectedTag: "All",
    project: {
      name: "",
      description: "",
      tags: [],
      safe_name: "none",
      projectLink: "",
      banner: ""
    }
    
  }),
  getters: {
    allTags(state) {
      // Get unique tags from all projects
      let tags = []
      state.projects.forEach(project => {
        project.tags.forEach(tag => {
          if (!tags.includes(tag)) {
            tags.push(tag)
          }
        })
      })
      return tags
    },
    project_image(state) {
      return import.meta.env.VITE_BASE_MEDIA_URL + state.project.banner
    }
  },
  actions: {
    setSelectedProject(safe_name){
      this.project = this.projects.find(project => project.safe_name === safe_name)
    },
    async getProjectBySafeName(safe_name){
      let project = await axios.get(`/projects?safe_name=${safe_name}`)
      if (project.data.length > 0) {
        return project.data[0]
      } else{
        return []
      }
    },
    async addProject(project){
      // Add project to database
      if (project.banner !== "") {
        let formData = new FormData()
        formData.append('file', project.banner)
        await axios.post(import.meta.env.VITE_BASE_API_URL + `/images`, formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
          project.banner = response.data
        }).catch(error => {
          console.log(error)
        })
      }
      project.tags = project.tags.split(",")
      let response = await axios.post(import.meta.env.VITE_BASE_API_URL + `/projects`, project).then(response => {
        return response
      }).catch(error => {
        console.log(error.response)
        return error.response
      })
      return response
    },

    async deleteProject(safe_name){
      // Delete project from database
      let response = await axios.delete(import.meta.env.VITE_BASE_API_URL + `/projects/${safe_name}`)
      if (response.status === 200) {
        this.projects = this.projects.filter(project => project.safe_name !== safe_name)
      }
      return response
    },

    async updateProject(project){
      // Update project in database
      if (project.banner !== "") {
        let formData = new FormData()
        formData.append('file', project.banner)
        await axios.post(import.meta.env.VITE_BASE_API_URL + `/images`, formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
          project.banner = response.data
        }).catch(error => {
          console.log(error)
        })
      }
      console.log(project.tags)
      project.tags = project.tags.split(",")
      let response = await axios.put(import.meta.env.VITE_BASE_API_URL + `/projects/${project.safe_name}`, project).then(response => {
        console.log(response)
        return response
      }).catch(error => {
        console.log(error.response)
        return error.response
      })
      return response
      
    },

    async getAllProjects(){
      // Get all projects from database
      this.loadingProjects = true
      this.projects = await axios.get(import.meta.env.VITE_BASE_API_URL + '/projects').then(function(response){
        return response.data
      })
      this.loadingProjects = false
      return this.projects
    },

    async getPostsByProject(safe_name){
      // Get all posts from database
      let posts = await axios.get(import.meta.env.VITE_BASE_API_URL + '/projects/'+safe_name+'/posts').then(function(response){
        console.log(response)
        return response
      }).catch(error => {
        console.log(error.response)
        return error.response
      })
      return posts
    },

    async createPost(post, safe_name){
      // Add post to database
      let response = await axios.post(import.meta.env.VITE_BASE_API_URL + `/projects/${safe_name}/posts`, post).then(response => {
        return response
      }).catch(error => {
        console.log(error.response)
        return error.response
      })
      return response
    },

    ImageUrl(image){
      // Get image url from database
      return import.meta.env.VITE_BASE_MEDIA_URL + image
    }

  }
});

