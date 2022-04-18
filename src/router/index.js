import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'
import { UseUserStore } from '../stores/userStore'



async function checkIfValidProject(safe_name) {
  return await axios.get(import.meta.env.VITE_BASE_API_URL + `/projects?safe_name=${safe_name}`).then(
    response => {
      if (response.data.length > 0) {
        return {
          valid: true,
          project: response.data[0]
        }
      } else {
        console.log("Project doesn't exist!")
        return {
          valid: false
        }
      }
    }
  )
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/projects/:safe_name/edit',
      name: 'editProject',
      meta: {requiresAuth: true},
      component: () => import('../views/ProjectsAddEditView.vue')
    },
    {
      path: '/projects/:safe_name',
      name: 'viewProject',
      component: () => import('../views/ProjectsIndividualView.vue'),
      beforeEnter: (to, from, next) => {
        axios.get(import.meta.env.VITE_BASE_API_URL + `/projects?safe_name=${to.params.safe_name}`).then(
          response => {
            if (response.data.length > 0) {
              to.params.project = response.data[0]
              next()
            } else {
              next({ name: 'projects' })
            }
          }
        )
      }
    },
    {
      path: '/projects/add',
      name: 'addProject',
      meta: {requiresAuth: true},
      component: () => import('../views/ProjectsAddEditView.vue')
    },
    {
      path: '/projects/:safe_name/posts/add',
      name: 'addPost',
      meta: {requiresAuth: true},
      component: () => import('../views/PostAddView.vue'),
      beforeEnter: (to, from, next) => {
        checkIfValidProject(to.params.safe_name).then(
          response => {
            if (response.valid) {
              to.params.project_name = response.project.name
              next()
            } else {
              next({ name: 'projects' })
            }
          }
        )
      }
    },
    {
      path: '/auth/login',
      name: 'login',
      meta: {isGuest: true},
      component: () => import('../views/LoginView.vue')
    }
  ]
})

// -- Nav Guard Logic -- //

router.beforeEach((to, from, next) => {
  const userStore = UseUserStore()
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (userStore.isLoggedIn) {
      next()
      return
    }
    next({ name: 'login' })
  } else {
    next()
  }

  if(to.matched.some(record => record.meta.isGuest)) {
    if (userStore.isLoggedIn) {
      next({ name: 'home' })
      return
    }
    next()
  }
})
export default router
