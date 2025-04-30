import { App } from 'vue';
import { formatDate, now } from './date';
import { timezone } from './timezone';

export interface TimezonePlugin {
  readonly current: string | null;
  now(): any;
  format(date: any, format?: string): string;
}

export const TimezonePlugin = {
  install(app: App) {
    const value: TimezonePlugin = {
      get current() {
        return timezone.current;
      },
      now,
      format: formatDate
    };

    app.config.globalProperties.$timezone = value;
  }
};
