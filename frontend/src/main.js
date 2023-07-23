import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);

app.use(
  createAuth0({
    domain: 'dev-ph5y5f7c33zlszx5.us.auth0.com',
    clientId: 'Csz8wDQ7mUYvA2fmM40RnCB7iIqemtbI',
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
    onRedirectCallback: (appState) => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
    },
  })
);

app.use(router);

app.mount('#app');
