import { RouteProps } from 'react-router-dom'
import {AboutPage} from 'pages/AboutPage'
import {AuctionPage} from 'pages/AuctionPage'
import {AuctionsPage} from 'pages/AuctionsPage'
import {AuthPage} from 'pages/AuthPage'
import {LotPage} from 'pages/LotPage'
import {MainPage} from 'pages/MainPage'
import {NotFoundPage} from 'pages/NotFoundPage'

export enum Routes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND= '404',
    AUTH = 'auth',
    LOT = 'lot',
    AUCTIONS = 'auctions',
    AUCTION = 'auctions',
}

export const routePaths: Record<Routes, string> = {
    [Routes.MAIN]: '/',
    [Routes.ABOUT]: '/about',
    [Routes.NOT_FOUND]: '*',
    [Routes.AUTH]: '/auth',
    [Routes.LOT]: '/lot',
    [Routes.AUCTIONS]: '/auctions',
    [Routes.AUCTION]: '/auction',
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
    },
    [Routes.LOT]: {
        path: routePaths[Routes.LOT],
        element: <LotPage/>
    },
    [Routes.AUCTIONS]: {
        path: routePaths[Routes.AUCTIONS],
        element: <AuctionsPage/>
    },
    [Routes.AUCTION]: {
        path: routePaths[Routes.AUCTION],
        element: <AuctionPage/>
    }
}
