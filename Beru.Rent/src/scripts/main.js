
// Composables
import App from '../App.vue'
import { createApp } from 'vue'

import PrimeVue from 'primevue/config';
import { UserManager } from 'oidc-client';
import { registerPlugins } from '@/plugins'
import store from './store';
const app = createApp(App)

app.use(PrimeVue);
registerPlugins(app)




const userManager = new UserManager({
  authority: 'https://localhost:7258',
  client_id: 'client_id_vue',
  redirect_uri: 'https://localhost:3000/callback',
  response_type: 'code',
  scope: 'openid profile offline_access',
  silent_redirect_uri: 'https://localhost:3000/silent-refresh',
  post_logout_redirect_uri: 'https://localhost:3000/'

});



  app.config.globalProperties.$userManager = userManager;

  userManager.events.addUserLoaded(user => {
    console.log('Пользователь успешно загружен. Данные пользователя:', user);

    // Сохранить данные пользователя в хранилище
    store.dispatch('setUser', user);

  });

  app.use(store).mount('#app');



