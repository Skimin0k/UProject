import React, {memo, ReactNode, Suspense, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {Navigate, Route, Routes} from 'react-router-dom'
import {getAuthData} from 'entities/User'
import {AppRoutesProps, routePaths, routerConfig, Routes as RouteNames} from 'shared/config/routeConfig/routerConfig'

interface ProtectedRouteProps {
    children?: ReactNode ,
}
const ProtectedRoute = (props: ProtectedRouteProps) => {
    const {
        children
    } = props
    const auth = useSelector(getAuthData)
    if (!auth) {
        return <Navigate to={routePaths[RouteNames.MAIN]} replace />
    }

    return <>{children}</>
}
const AppRouter = () => {

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        return <Route
            path={route.path}
            key={route.path}
            element={route.authOnly? <ProtectedRoute>{route.element}</ProtectedRoute>: route.element}/>
    }, [])

    return (
        // eslint-disable-next-line i18next/no-literal-string
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(routerConfig).map(renderWithWrapper)}
            </Routes>
        </Suspense>
    )
}

export default memo(AppRouter)