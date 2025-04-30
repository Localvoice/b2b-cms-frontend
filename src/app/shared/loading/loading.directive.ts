import { Directive } from 'vue';
import { loadingService } from './loading.service';
import { SysLoadingNamespace } from './types';

let LOADING_NEXT_ID = 0;

type LoadingElement = HTMLElement & {
  instance: SysLoadingNamespace;
};

export const SysLoading: Directive<HTMLElement, boolean> = {
  beforeMount(el, binding) {
    const name = binding.arg || `sys-loading-${(LOADING_NEXT_ID += 1)}`;
    const bindingElement = el as LoadingElement;

    bindingElement.instance = loadingService.create({
      name,
      target: el
    });

    if (binding.value) {
      bindingElement.instance.register();
    }
  },
  updated(el, binding) {
    const bindingElement = el as LoadingElement;

    if (binding.oldValue !== binding.value) {
      binding.value ? bindingElement.instance.register() : bindingElement.instance.resolve();
    }
  },
  unmounted(el) {
    const bindingElement = el as LoadingElement;
    bindingElement.instance.remove();
  }
};
