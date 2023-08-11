import { RouteProps } from 'react-router-dom'
import {AboutPage} from 'pages/AboutPage'
import {MainPage} from 'pages/MainPage'
import {NotFoundPage} from 'pages/NotFoundPage'

export enum Routes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND= '404'
}

export const routePaths: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.ABOUT]: '/about',
    [Routes.NOT_FOUND]: '*'
}

export const routerConfig: Record<Routes, RouteProps> = {
    [Routes.MAIN]: {
        path: routePaths[Routes.MAIN],
        element: <MainPage/>
    },
    [Routes.ABOUT]: {
        path: routePaths[Routes.ABOUT],
        element: <AboutPage/>
    },
    [Routes.NOT_FOUND]: {
        path: routePaths[Routes.NOT_FOUND],
        element: <NotFoundPage/>
    }
}
