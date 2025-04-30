import { App, createApp } from 'vue';
import { SysToast } from './types';
import ToastComponent from './toast.vue';

const VARIANT_ICON: { [key: string]: string } = {
  success: 'fas fa-check-circle',
  info: 'fas fa-info-circle',
  warning: 'fas fa-exclamation-circle',
  danger: 'fas fa-times-circle'
};

export const SysToastFactory = (): SysToast => {
  const showToast = (message: string, options: { color: string }) => {
    const toastContainer = document.querySelector('#app');
    const mountNode = document.createElement('div');
    mountNode.id = 'toast-node';
    if (toastContainer) {
      toastContainer.appendChild(mountNode);

      // const toastApp = createApp(ToastComponent);

      // toastApp.mount(mountNode);
    }
  };

  return {
    success(message): void {
      showToast(message, { color: 'success' });
    },
    danger(message): void {
      showToast(message, { color: 'danger' });
    },
    info(message): void {
      showToast(message, { color: 'info' });
    },
    warning(message): void {
      showToast(message, { color: 'warning' });
    }
  };
};

export const SysToastPlugin = {
  install(app: App) {
    app.config.globalProperties.$toast = SysToastFactory();
  }
};
