import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Modal } from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';
import './assets/css/common.css'

const app = createApp(App);
app.component('ModalWindow', Modal);
app.use(createPinia());
app.use(router)
app.mount('#app')
