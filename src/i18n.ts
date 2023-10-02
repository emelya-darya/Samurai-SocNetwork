import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

export default i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // debug: true,
        fallbackLng: 'en',
        lng: localStorage.getItem('lng') || 'en', // язык по умолчанию
        supportedLngs: ['en', 'ru'],
        detection: {
            order: ['cookie', 'localstorage', 'htmlTag', 'path', 'subdomain'],
            caches: ['localstorage'],
        },
        // backend: {
        //     loadPath: '/locales/{lng}/translation.json',
        // },
    })
