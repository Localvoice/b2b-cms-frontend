// import Vue from 'vue';
// import Vuetify from 'vuetify/lib';
import { themePreset } from '@/themeConfig';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Vue.use(Vuetify);
export default createVuetify({
  components,
  directives
});
