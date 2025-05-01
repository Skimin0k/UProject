import React, {Suspense} from 'react'
import {useDispatch} from 'react-redux'
import AppRouter from 'app/AppRouter/AppRouter'
import ErrorBoundary from 'app/ErrorBoundary/ErrorBoundary'
import {useTheme} from 'shared/theme'

import classNames from '../shared/lib/classNames/classNames'

const App = () => {
    const {theme} = useTheme()
    const dispatch = useDispatch()
    return (
        <div className={classNames('app global', {}, [theme])}>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Suspense fallback={'Loading'}>
                <ErrorBoundary>
                    <AppRouter/>
                    <div id={'modal-root'}/>
                </ErrorBoundary>
            </Suspense>
        </div>
    )
}

export default App