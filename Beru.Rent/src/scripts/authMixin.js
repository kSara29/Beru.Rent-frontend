import userManager from '@/scripts/oidcConfig';

   export default {
     methods: {
       login() {
         userManager.signinRedirect();
       },
       logout() {
         userManager.signoutRedirect();
       },
     },
   };