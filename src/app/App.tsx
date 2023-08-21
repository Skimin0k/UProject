import React, {Suspense, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AppRouter from 'app/AppRouter/AppRouter'
import ErrorBoundary from 'app/ErrorBoundary/ErrorBoundary'
import {getUserInit, userActions} from 'entities/User'
import {useTheme} from 'shared/theme'
import Navbar from 'widgets/Navbar/Navbar'

import classNames from '../shared/lib/classNames/classNames'

const App = () => {
    const {theme} = useTheme()
    const dispatch = useDispatch()
    const isInit = useSelector(getUserInit)
    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])
    return (
        <div className={classNames('app global', {}, [theme])}>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Suspense fallback={'Loading'}>
                <ErrorBoundary>
                    <Navbar/>
                    {isInit && <AppRouter/>}
                    <div id={'modal-root'}/>
                </ErrorBoundary>
            </Suspense>
        </div>
    )
}

export default App