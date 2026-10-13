import { createI18n } from 'vue-i18n';

import sr from './locales/sr';
import en from './locales/en';
import de from './locales/de';

export type AppLocale = 'sr' | 'en' | 'de';

const supportedLocales: AppLocale[] = ['sr', 'en', 'de'];

const savedLocale = localStorage.getItem('gg-rent-locale');

const defaultLocale: AppLocale =
    supportedLocales.includes(savedLocale as AppLocale)
        ? (savedLocale as AppLocale)
        : 'sr';

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: defaultLocale,
    fallbackLocale: 'sr',
    messages: {
        sr,
        en,
        de,
    },
});

document.documentElement.lang = defaultLocale;

export function setLocale(locale: AppLocale) {
    i18n.global.locale.value = locale;
    localStorage.setItem('gg-rent-locale', locale);
    document.documentElement.lang = locale;
}

export default i18n;