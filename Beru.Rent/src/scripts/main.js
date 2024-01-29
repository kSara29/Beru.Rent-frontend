import { registerPlugins } from '@/plugins'

import { createApp } from 'vue'
import App from '../App.vue'
import PrimeVue from 'primevue/config';

const app = createApp(App)

app.use(PrimeVue);

registerPlugins(app)


app.mount('#app')
