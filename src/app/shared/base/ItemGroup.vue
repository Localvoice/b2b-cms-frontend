<template>
  <v-list-group
    v-model="listModel"
    :prepend-icon="item.icon"
    :sub-group="subGroup"
    flat
    active-class="dark darken-1 white--text DUPA!!"
    class="pl-0"
    dark
  >
    <template v-slot:activator>
      <v-list-item-icon v-if="text" class="v-list-item__icon--text" dark v-text="computedText" />

      <v-list-item-content dark>
        <v-list-item-title dark class="text-14" v-text="item.title" />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in children" :key="i">
      <base-item-sub-group v-if="child.children" :item="child" dark />
      <base-item v-else :item="child" :text="false" />
    </template>
  </v-list-group>
</template>

<script setup>
import { computed, ref } from 'vue';
import kebabCase from 'lodash/kebabCase'; // Utility function

// Define props
const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      avatar: undefined,
      group: undefined,
      title: undefined,
      subHeader: undefined,
      children: []
    })
  },
  subGroup: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  }
});

// Local state
const listModel = ref(0);
const verticalSidebarDrawerColor = ref('dark');

// Computed properties
const children = computed(() => {
  return props.item.children.map((item) => ({
    ...item,
    to: !item.to ? undefined : `/app/${props.item.group}/${item.to}`
  }));
});

const computedText = computed(() => {
  if (!props.item || !props.item.title) return '';

  let text = '';
  props.item.title.split(' ').forEach((val) => {
    text += val.substring(0, 1);
  });

  return text;
});

const group = computed(() => genGroup(props.item.children));

// Methods
function genGroup(children) {
  return children
    .filter((item) => item.to)
    .map((item) => {
      const parent = item.group || props.item.group;
      let group = `${parent}/${kebabCase(item.to)}`;

      if (item.children) {
        group = `${group}|${genGroup(item.children)}`;
        console.log('child');
      }

      return group;
    })
    .join('|');
}
</script>
