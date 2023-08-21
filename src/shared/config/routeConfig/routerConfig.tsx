import { RouteProps } from 'react-router-dom'
import {AboutPage} from 'pages/AboutPage'
import {MainPage} from 'pages/MainPage'
import {NotFoundPage} from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage/ui/ProfilePage'

export enum Routes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    NOT_FOUND= '404'
}

export const routePaths: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.ABOUT]: '/about',
    [Routes.PROFILE]: '/profile',
    [Routes.NOT_FOUND]: '*'
}

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}
export const routerConfig: Record<Routes, AppRoutesProps> = {
    [Routes.MAIN]: {
        path: routePaths[Routes.MAIN],
        element: <MainPage/>
    },
    [Routes.ABOUT]: {
        path: routePaths[Routes.ABOUT],
        element: <AboutPage/>
    },
    [Routes.PROFILE]: {
        path: routePaths[Routes.PROFILE],
        element: <ProfilePage/>,
        authOnly: true
    },
    [Routes.NOT_FOUND]: {
        path: routePaths[Routes.NOT_FOUND],
        element: <NotFoundPage/>
    }
}
