import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/common.css'

const app = createApp(App);

import { Modal } from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';
app.component('ModalWindow', Modal);

app.mount('#app')
