import { App } from 'vue';
import FixedButton from './fixedButton.vue';

export const FixedButtonPlugin = {
  install(app: App) {
    app.component('FixedButton', FixedButton);
  }
};
