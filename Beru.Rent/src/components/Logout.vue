<template>
    <div>
      <h2>Logging out...</h2>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      // Вызываем метод logout при монтировании компонента
      this.logout();
    },
    methods: {
      async logout() {
        try {
          // Отправляем запрос на сервер для выхода из системы  
          // В зависимости от вашего бэкенда, это может быть HTTP-запрос или другой метод
          // Например, с использованием axios:
          this.$store.commit('clearState');
          console.log('чищу токен')
          this.$router.push('https://localhost:3000/');
          console.log('редирект')
          this.$userManager.signoutRedirect();
          
          // Очищаем локальные данные пользователя, если они хранятся в приложении
          // например, в localStorage или Vuex store
         
          
          // Перенаправляем пользователя на страницу входа после успешного выхода
          
        } catch (error) {
          console.error('Logout failed', error);
          // Обработка ошибки, например, отображение сообщения об ошибке
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Стили для компонента могут быть добавлены здесь */
  </style>