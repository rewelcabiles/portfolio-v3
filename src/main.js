import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/tailwind.css'
import axios from 'axios'
import App from './App.vue'
import router from './router'

const port = 1024;
const app = createApp(App)

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("access_token");
    config.baseURL = import.meta.env.VITE_BASE_API_URL;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

app.use(createPinia())
app.use(router)

app.mount('#app')
