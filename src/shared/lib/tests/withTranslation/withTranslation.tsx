import {I18nextProvider} from 'react-i18next'
import i18nForTests from 'shared/i18n/i18nForTests'
import {ReactNode} from 'react'

export const withTranslation = (component: ReactNode) => {
    return <I18nextProvider i18n={i18nForTests}>
        {component}
    </I18nextProvider>
}