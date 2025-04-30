import { App } from 'vue';
import WebFontLoader from 'webfontloader';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import LogRocket from 'logrocket';
import { createHead } from '@vueuse/head';

export const VendorsPlugin = {
  install(app: App) {
    // If using vue-meta-3 or @vueuse/head (recommended in Vue 3)
    const head = createHead();
    app.use(head);

    // Register VuePerfectScrollbar component globally
    app.component('VuePerfectScrollbar', PerfectScrollbarPlugin);

    // Initialize LogRocket
    LogRocket.init('9r8zu6/localvoice');

    // Load web fonts asynchronously
    WebFontLoader.load({
      google: {
        families: ['Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap']
      }
    });
  }
};
