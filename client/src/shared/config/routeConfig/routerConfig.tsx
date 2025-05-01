import { RouteProps } from 'react-router-dom'
import {AboutPage} from 'pages/AboutPage'
import {AuthPage} from 'pages/AuthPage'
import {MainPage} from 'pages/MainPage'
import {NotFoundPage} from 'pages/NotFoundPage'

export enum Routes {
    MAIN = 'main',
    ABOUT = 'about',
    AUTH = 'auth',
    NOT_FOUND= '404'
}

export const routePaths: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.ABOUT]: '/about',
    [Routes.NOT_FOUND]: '*',
    [Routes.AUTH]: '/auth'
}

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}
export const routerConfig: Record<Routes, AppRoutesProps> = {
    [Routes.MAIN]: {
        path: routePaths[Routes.MAIN],
        element: <MainPage/>,
        authOnly: true
    },
    [Routes.ABOUT]: {
        path: routePaths[Routes.ABOUT],
        element: <AboutPage/>,
        authOnly: true
    },
    [Routes.NOT_FOUND]: {
        path: routePaths[Routes.NOT_FOUND],
        element: <NotFoundPage/>
    },
    [Routes.AUTH]: {
        path: routePaths[Routes.AUTH],
        element: <AuthPage/>
    }
}
