import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        fallbackLng:'ru',
        load: 'languageOnly',
        debug: true,
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        }
    })

export default i18n