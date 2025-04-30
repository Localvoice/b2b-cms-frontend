import { defineComponent, h } from 'vue';
import { RouterView as RouterViewComponent } from 'vue-router';

export const RouterView = defineComponent({
  name: 'EmptyRouterView',
  setup() {
    return () => h(RouterViewComponent);
  }
});
