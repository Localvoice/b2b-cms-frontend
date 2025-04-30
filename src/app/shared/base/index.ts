import { App } from 'vue'; // Import App type from Vue 3
import BaseCard from './Card.vue';
import BaseItemGroup from './ItemGroup.vue';
import BaseHoverButton from './HoverButton.vue';
import BaseItem from './Item.vue';

export const BaseComponentsPlugin = {
  install(app: App) {
    // app.component('BaseCard', BaseCard);
    // app.component('BaseItemGroup', BaseItemGroup);
    // app.component('BaseHoverButton', BaseHoverButton);
    // app.component('BaseItem', BaseItem);
  }
};
