import { App } from 'vue';

type Script = 'script';

declare global {
  interface Window {
    fbAsyncInit: any;
    FB: any;
  }
}

export const FacebookSDKPlugin = {
  install(app: App) {
    (function (document: Document, script: Script, id: string) {
      const fjs = document.getElementsByTagName(script)[0];
      if (document.getElementById(id)) return;
      const js = document.createElement(script);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      if (fjs.parentNode) fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    window.fbAsyncInit = function onSDKInit() {
      window.FB.init({
        appId: '1358537151286274',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
      });

      //   FB.getLoginStatus((response) => {
      //     console.log('login response', response);
      //   });

      //   FB.logout((response) => {
      //     console.log('user logout', response);
      //   });
      // };
      // Vue.FB = undefined;
    };
  }
};
