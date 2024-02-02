// auth.service.js
import { UserManager, WebStorageStateStore } from 'oidc-client';
import authConfig from '@/scripts/oidcConfig';

const userManager = new UserManager({
  ...authConfig,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});

export default {
  login() {
    return userManager.signinRedirect();
  },
  logout() {
    return userManager.signoutRedirect();
  },
  getUser() {
    return userManager.getUser();
  },
  
};
