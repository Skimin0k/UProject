import React, {Suspense} from 'react'
import classNames from '../shared/lib/classNames/classNames'
import {useTheme} from 'shared/theme'
import AppRouter from 'app/AppRouter/AppRouter'
import Navbar from 'widgets/Navbar/Navbar'
import ErrorBoundary from 'app/ErrorBoundary/ErrorBoundary'

const App = () => {
    const {theme} = useTheme()
    return (
        <div className={classNames('app', {}, [theme])}>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Suspense fallback={'Loading'}>
                <ErrorBoundary>
                    <Navbar/>
                    <AppRouter/>
                </ErrorBoundary>
            </Suspense>
        </div>
    )
}

export default App