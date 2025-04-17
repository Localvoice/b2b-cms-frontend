import { createI18n, I18n, I18nOptions } from 'vue-i18n';
import axios from 'axios';
import { IS_DEV, PUBLIC_PATH } from '../env';
import languagesConfig from './languages';
import messages from './messages/index';

export interface Language {
  id: string;
  name: string;
}

export const languages = languagesConfig;
export const defaultLanguage = languages[1].id;

const options: I18nOptions = {
  legacy: false, // using Composition API mode
  locale: defaultLanguage,
  fallbackLocale: defaultLanguage,
  globalInjection: true, // allows $t in templates
  messages,
  warnHtmlMessage: false,
  missingWarn: IS_DEV,
  fallbackWarn: IS_DEV
};

export const i18n = createI18n(options);

function updateLanguage(lang: string): string | null {
  i18n.global.locale.value = lang;
  const html = document.querySelector('html');
  if (!html) return null;
  html.setAttribute('lang', lang.substring(0, 2));
  return lang;
}

const loadedLanguages: string[] = [];

export function setLanguage(lang: string): Promise<string | null> {
  if (!lang || !languageExist(lang)) {
    return Promise.resolve(i18n.global.locale.value);
  }

  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(updateLanguage(lang));
  }

  return axios.get(`${PUBLIC_PATH}i18n/${lang}.json`).then((res) => {
    i18n.global.setLocaleMessage(lang, res.data);
    loadedLanguages.push(lang);
    return updateLanguage(lang);
  });
}

export const translate = (key: string, arg?: Record<string, unknown>): string => {
  if (!key) return '';
  return i18n.global.t(key, arg);
};

export const languageExist = (lang: string): boolean => languages.some((language) => language.id === lang);
