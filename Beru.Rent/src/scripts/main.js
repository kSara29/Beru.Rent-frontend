//import Vue from 'vue';
import App from '../App.vue'
import { UserManager } from 'oidc-client';
import { registerPlugins } from '@/plugins'
import store from './store';

// Components

// Composables
import { createApp } from 'vue'
const app = createApp(App)
registerPlugins(app)


const userManager = new UserManager({
    authority: 'https://localhost:7258',
    client_id: 'client_id_vue',
    redirect_uri: 'https://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid profile',
   // silent_redirect_uri: 'https://localhost:3000/silent-refresh.html', // Указать URL silent-refresh.html и на ней userManager.signinSilentCallback(); // Обработка тихого обновления в случае наличия кода в URL
//посмотреть как делать рефреш  
});


  
  app.config.globalProperties.$userManager = userManager;  
  
  userManager.events.addUserLoaded(user => {
    console.log('Пользователь успешно загружен. Данные пользователя:', user);
  
    // Сохранить данные пользователя в хранилище
    store.dispatch('setUser', user);

  });
  
  app.use(store).mount('#app');

//app.mount('#app')

