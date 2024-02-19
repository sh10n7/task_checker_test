import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/css/common.css'
import { Modal } from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';

const app = createApp(App);
app.component('ModalWindow', Modal);
app.use(createPinia());

app.mount('#app')
