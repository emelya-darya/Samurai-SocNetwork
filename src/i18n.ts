import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

export default i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'ru',
        supportedLngs: ['en', 'ru'],
        detection: {
            order: ['localstorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
            caches: ['localstorage'],
        },
        // backend: {
        //     loadPath: '/locales/{lng}/translation.json',
        // },
    })
