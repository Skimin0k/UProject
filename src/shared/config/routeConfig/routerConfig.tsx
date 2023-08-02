import { RouteProps } from 'react-router-dom'
import {AboutPage} from 'pages/AboutPage'
import {MainPage} from 'pages/MainPage'

export enum Routes {
    MAIN,
    ABOUT
}

export const routePaths: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.ABOUT]: '/about'
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
}
