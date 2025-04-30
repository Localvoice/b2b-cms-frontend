/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
import { defineComponent, h } from 'vue';
import { ValidationError } from '../types';

export const FormControlState = defineComponent({
  name: 'FormControlState',
  props: {
    errors: {
      type: Array as () => ValidationError[],
      default: () => []
    },
    image: {
      type: String,
      default: ''
    },
    custom: {
      type: Object as () => { [key: string]: string },
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    let error: ValidationError | undefined;
    let blobFile: File | null = null;

    if (props.errors && props.errors.length > 0) {
      error = props.errors[0];
      if (props.custom && props.custom[error.type]) {
        error.message = props.custom[error.type];
      }
    }

    if (props.image) {
      blobFile = new File([], props.image);
    }

    if (!slots.default) return () => null;

    return () =>
      slots.default?.({
        state: error ? false : null,
        invalid: !!error,
        message: error ? error.message : null,
        blobFile
      });
  }
});
