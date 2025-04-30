import { createApp, h } from 'vue';
import PasswordModal from './modal.vue';

export function showPasswordModal(force = false) {
  // Create app instance with the component and props
  const app = createApp({
    render() {
      return PasswordModal;
    }
  });

  const container = document.createElement('div');
  document.body.appendChild(container);

  app.mount(container);

  return app;
}
