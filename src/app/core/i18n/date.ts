/* eslint-disable import/no-cycle */
import { Locale } from 'date-fns';
import { format as dateFnsFormat, FormatOptionsWithTZ, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { enAU, enUS, es } from 'date-fns/locale';
import { Converter } from '~app/shared/json-mapper';
import { defaultLanguage, i18n } from './i18n';
import { timezone } from './timezone';

const dateLocales: { [key: string]: Locale } = {
  'en-US': enUS,
  'en-AU': enAU,
  'en-NZ': enAU,
  'es-MX': es
};

/** Current time in user's timezone. */
export function now(): Date | null {
  if (timezone.current) return toZonedTime(new Date(), timezone.current);
  return null;
}

export function toUtc(date: Date | string | number): Date | null {
  if (timezone.current) return fromZonedTime(date, timezone.current);
  return null;
}

export function toUtcString(date: Date | string | number): string | null {
  if (date) return toUtc(date)!.toISOString();
  return null;
}

export function formatDate(date: Date, format = 'PP', options?: FormatOptionsWithTZ): string {
  return dateFnsFormat(date, format, {
    locale: dateLocales[defaultLanguage],
    timeZone: timezone.current || undefined,
    ...options
  });
}

export const dateZonedConverter: Converter = {
  fromJson(date: string): Date | null {
    if (timezone.current) return date ? toZonedTime(date, timezone.current) : null;
    return null;
  },
  toJson(date: Date): string | null {
    if (timezone.current) return date ? fromZonedTime(date, timezone.current).toISOString() : null;
    return null;
  }
};
