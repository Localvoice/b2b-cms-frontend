import { reactive } from 'vue';
import { api } from '../api/client';

// Reactive state using Vue 3's `reactive`
export const timezone = reactive({
  current: null as string | null
});

export function setTimezone(value: string) {
  timezone.current = value;
}

let timezones: Promise<string[]>;

export function listTimezones(): Promise<string[]> {
  if (!timezones) {
    timezones = api.get('/api/type/timezone').then((res) => res.data);
  }

  return timezones;
}
