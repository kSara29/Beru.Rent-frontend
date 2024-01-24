import { UserManager } from 'oidc-client';

const oidcConfig = {
  authority: 'YOUR_OIDC_AUTHORITY',
  client_id: 'client_id_vue',
  redirect_uri: `${window.location.origin}/callback`,
  response_type: 'id_token token',
  scope: 'openid profile email',
};

const userManager = new UserManager(oidcConfig);

export default userManager;