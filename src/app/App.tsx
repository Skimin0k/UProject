import React, {Suspense} from 'react'
import AppRouter from 'app/AppRouter/AppRouter'
import ErrorBoundary from 'app/ErrorBoundary/ErrorBoundary'
import {useTheme} from 'shared/theme'
import Navbar from 'widgets/Navbar/Navbar'

import classNames from '../shared/lib/classNames/classNames'

const App = () => {
    const {theme} = useTheme()
    return (
        <div className={classNames('app global', {}, [theme])}>
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