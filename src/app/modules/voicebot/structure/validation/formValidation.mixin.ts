import { defineComponent } from 'vue';
import { ValidationTarget } from '~app/shared/types';

export default defineComponent({
  data() {
    return {
      form: {},
      courseIndex: 0,
      validationId: '',
      targets: []
    };
  },
  watch: {
    'form.data': {
      deep: true,
      handler() {
        this.$emit('validation', {
          data: this.form,
          courseIndex: this.courseIndex,
          id: this.validationId,
          targets: [ValidationTarget.TEST]
        });
      }
    }
  }
});
