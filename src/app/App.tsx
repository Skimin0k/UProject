import React, {Suspense} from 'react'
import classNames from '../shared/lib/classNames/classNames'
import {useTheme} from 'shared/theme'
import AppRouter from 'app/AppRouter/AppRouter'
import Navbar from 'widgets/Navbar/Navbar'
import ErrorBoundary from 'app/ErrorBoundary/ErrorBoundary'
import {useTranslation} from 'react-i18next'

const App = () => {
    const {theme} = useTheme()
    const {t} = useTranslation('translation')

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback={t('loading')}>
                <ErrorBoundary>
                    <Navbar/>
                    <AppRouter/>
                </ErrorBoundary>
            </Suspense>
        </div>
    )
}

export default App